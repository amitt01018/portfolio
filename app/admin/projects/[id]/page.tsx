import { supabase } from '@/lib/supabase/client';
import EditProjectPage from './EditProject';

export async function generateStaticParams() {
  const { data, error } = await supabase.from('projects').select('id');

  if (error) {
    console.error('Error fetching project IDs:', error);
    return [];
  }

  return data?.map((project) => ({ id: project.id })) ?? [];
}

export default function ProjectPage({ params }: { params: { id: string } }) {
  return <EditProjectPage params={params} />;
}
