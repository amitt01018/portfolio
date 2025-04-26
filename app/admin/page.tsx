'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, FolderKanban, Mail, Users } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const adminLinks = [
    {
      title: 'Blog Posts',
      description: 'Manage your blog posts',
      icon: BookOpen,
      href: '/admin/blog',
    },
    {
      title: 'Projects',
      description: 'Manage your projects',
      icon: FolderKanban,
      href: '/admin/projects',
    },
    {
      title: 'Messages',
      description: 'View contact form submissions',
      icon: Mail,
      href: '/admin/messages',
    },
  ];

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-6"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Manage your content and view analytics
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {adminLinks.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link href={link.href}>
                <Card className="hover:bg-muted/50 transition-colors">
                  <CardHeader>
                    <link.icon className="h-8 w-8 text-primary" />
                    <CardTitle className="mt-4">{link.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{link.description}</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
