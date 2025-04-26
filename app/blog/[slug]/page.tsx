'use client';

import { supabase } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { ArrowLeft, Clock, ThumbsUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { Database } from '@/lib/supabase/database.types';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Button } from '@/components/ui/button';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!slug) {
          throw new Error('Invalid blog post URL');
        }

        const { data, error: fetchError } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('slug', slug)
          .eq('published', true)
          .single();

        if (fetchError) {
          if (fetchError.code === 'PGRST116') {
            throw new Error('Blog post not found');
          }
          throw fetchError;
        }

        setPost(data);
        setError(null);
      } catch (err: any) {
        setError(err.message);
        toast({
          title: 'Error',
          description: err.message,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [slug, toast]);

  const handleLike = async () => {
    if (!post) return;

    try {
      const { error } = await supabase
        .from('blog_posts')
        .update({ likes: (post.likes || 0) + 1 })
        .eq('id', post.id);

      if (error) throw error;

      setPost(prev => prev ? { ...prev, likes: (prev.likes || 0) + 1 } : null);
      
      toast({
        title: 'Thanks!',
        description: 'Your like has been recorded.',
      });
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to like the post. Please try again.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="container py-12 space-y-8 animate-pulse">
        <div className="h-8 bg-muted rounded w-3/4 mx-auto"></div>
        <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
        <div className="aspect-video bg-muted rounded-lg max-w-3xl mx-auto"></div>
        <div className="space-y-4 max-w-3xl mx-auto">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container py-12 text-center">
        <h1 className="text-2xl font-bold">
          {error || 'Blog post not found'}
        </h1>
        <p className="text-muted-foreground mt-2">
          The blog post you're looking for doesn't exist or has been removed.
        </p>
        <Button
          variant="link"
          className="mt-4"
          onClick={() => router.push('/blog')}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </div>
    );
  }

  return (
    <article className="container py-12 max-w-4xl">
      <Link
        href="/blog"
        className="inline-flex items-center mb-8 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{post.title}</h1>
        
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
          {post.published_at && (
            <time dateTime={post.published_at}>
              {format(new Date(post.published_at), 'MMMM d, yyyy')}
            </time>
          )}
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.reading_time} min read</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="gap-1"
            onClick={handleLike}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>{post.likes || 0}</span>
          </Button>
        </div>
        
        <div className="flex flex-wrap gap-2 mt-4">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        
        {post.cover_image && (
          <div className="mt-8 overflow-hidden rounded-lg">
            <img
              src={post.cover_image}
              alt={post.title}
              className="w-full object-cover"
            />
          </div>
        )}
        
        <div className="mt-8 prose prose-neutral dark:prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </motion.div>
    </article>
  );
}