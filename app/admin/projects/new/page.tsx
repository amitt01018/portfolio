'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function NewProjectPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [techStack, setTechStack] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [featured, setFeatured] = useState(false);
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const techStackArray = techStack.split(',').map((tech) => tech.trim());
    const user = await supabase.auth.getUser();
    const userId = user.data.user?.id;
    const { error } = await supabase.from('projects').insert({
      title,
      description,
      content,
      tech_stack: techStackArray,
      github_url: githubUrl,
      demo_url: liveUrl,
      featured,
      image_url: image,
      user_id: userId,
    });

    if (error) {
      toast({
        title: 'Error creating project',
        description: error.message,
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Project created',
        description: 'Your project was created successfully.',
      });
      router.push('/admin/projects');
    }

    setIsLoading(false);
  };

  return (
    <div className="container py-12">
      <h1 className="text-3xl font-bold mb-6">New Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
        </div>

        <div>
          <Label htmlFor="tech_stack">Tech Stack (comma-separated)</Label>
          <Input
            id="tech_stack"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="github_url">GitHub URL</Label>
          <Input
            id="github_url"
            type="url"
            value={githubUrl}
            onChange={(e) => setGithubUrl(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="live_url">Live URL</Label>
          <Input
            id="live_url"
            type="url"
            value={liveUrl}
            onChange={(e) => setLiveUrl(e.target.value)}
          />
        </div>

        <div>
          <Label htmlFor="image">Image URL</Label>
          <Input
            id="image"
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="featured"
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
          />
          <Label htmlFor="featured">Featured</Label>
        </div>

        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? 'Creating...' : 'Create Project'}
        </Button>
      </form>
    </div>
  );
}
