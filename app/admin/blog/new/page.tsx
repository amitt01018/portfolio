'use client';

import { useSupabase } from '@/lib/hooks/use-supabase';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { Database } from '@/lib/supabase/database.types';
import { format } from 'date-fns';
import { supabase } from '@/lib/supabase/client';

type BlogPost = Database['public']['Tables']['blog_posts']['Row'];

export default function AdminBlogNewPage() {
  const { user } = useSupabase();
  const router = useRouter();
  const { toast } = useToast();

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [content, setContent] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [published, setPublished] = useState(false);
  const [publishedAt, setPublishedAt] = useState<Date | null>(null);
  const [coverImage, setCoverImage] = useState('');
  const [tags, setTags] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: 'Authentication Error',
        description: 'You need to be logged in to create a blog post.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);

    try {
      // Insert the new post into the blog_posts table
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([
          {
            title,
            slug,
            content,
            excerpt,
            published,
            published_at: publishedAt
              ? format(publishedAt, 'yyyy-MM-dd')
              : null,
            cover_image: coverImage,
            user_id: user.id,
            tags: tags.split(',').map((tag) => tag.trim()), // Convert comma-separated tags to an array
          },
        ])
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: 'Blog Post Created',
        description: 'Your new blog post has been successfully created.',
      });

      // Redirect to the list of blog posts or the new post page
      router.push('/admin/blog');
    } catch (error: any) {
      toast({
        title: 'Error creating blog post',
        description: error.message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold tracking-tight">
        Create New Blog Post
      </h1>
      <form onSubmit={handleSubmit} className="space-y-8 mt-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              placeholder="Enter the title of your post"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">Slug</Label>
            <Input
              id="slug"
              type="text"
              placeholder="Enter the slug"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Content</Label>
            <Textarea
              id="content"
              placeholder="Write your blog content here"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              placeholder="Enter a short excerpt for your blog post"
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="publishedAt">Publish Date</Label>
            <Input
              id="publishedAt"
              type="datetime-local"
              value={
                publishedAt ? format(publishedAt, "yyyy-MM-dd'T'HH:mm") : ''
              }
              onChange={(e) => setPublishedAt(new Date(e.target.value))}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image URL</Label>
            <Input
              id="coverImage"
              type="text"
              placeholder="Enter the cover image URL"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tags">Tags (comma-separated)</Label>
            <Input
              id="tags"
              type="text"
              placeholder="Enter tags for the blog post"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="published">Published</Label>
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
            />
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? 'Creating post...' : 'Create Post'}
        </Button>
      </form>
    </div>
  );
}
