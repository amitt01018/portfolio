// app/admin/blog/[id]/page.tsx

import { supabase } from '@/lib/supabase/client';
import EditBlogPage from './EditBlog';

export async function generateStaticParams() {
  // Fetch all blog post IDs to pre-render the paths
  const { data, error } = await supabase.from('blog_posts').select('id');

  if (error) {
    console.error('Error fetching blog post IDs:', error);
    return [];
  }

  return (
    data?.map((post) => ({
      id: post.id,
    })) ?? []
  );
}

// This serves as a placeholder, actual editing page is rendered from EditBlog component
export default function BlogPage({ params }: { params: { id: string } }) {
  return <EditBlogPage params={params} />;
}
