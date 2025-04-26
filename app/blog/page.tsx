'use client';

import { supabase } from '@/lib/supabase/client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Database } from '@/lib/supabase/database.types';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blog_posts')
          .select('*')
          .eq('published', true)
          .order('published_at', { ascending: false });

        if (error) throw error;
        setPosts(data || []);
      } catch (error: any) {
        toast({
          title: 'Error loading blog posts',
          description: error.message,
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [toast]);

  return (
    <div className="container py-12 space-y-8">
      <div className="space-y-4 text-center">
        <motion.h1 
          className="text-4xl font-bold tracking-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Blog
        </motion.h1>
        <motion.p 
          className="text-muted-foreground max-w-[700px] mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Thoughts, tutorials, and insights on web development
        </motion.p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-muted"></div>
              <CardHeader>
                <div className="h-7 bg-muted rounded-md"></div>
              </CardHeader>
              <CardContent>
                <div className="h-20 bg-muted rounded-md"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href="#">
                <Card className="overflow-hidden h-full flex flex-col hover:shadow-md transition-shadow">
                  {post.cover_image && (
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={post.cover_image}
                        alt={post.title}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <CardHeader>
                    <div className="space-y-2">
                      <h2 className="text-2xl font-bold line-clamp-2">{post.title}</h2>
                      <div className="flex flex-wrap gap-2">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="secondary">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                  </CardContent>
                  <CardFooter className="mt-auto text-sm text-muted-foreground">
                    {post.published_at && (
                      <time dateTime={post.published_at}>
                        {formatDistanceToNow(new Date(post.published_at), { addSuffix: true })}
                      </time>
                    )}
                  </CardFooter>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
