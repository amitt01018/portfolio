export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      projects: {
        Row: {
          id: string
          created_at: string
          title: string
          description: string
          content: string
          image_url: string
          github_url: string | null
          demo_url: string | null
          tech_stack: string[]
          featured: boolean
          user_id: string
          slug: string
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          description: string
          content: string
          image_url: string
          github_url?: string | null
          demo_url?: string | null
          tech_stack: string[]
          featured?: boolean
          user_id: string
          slug: string
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          description?: string
          content?: string
          image_url?: string
          github_url?: string | null
          demo_url?: string | null
          tech_stack?: string[]
          featured?: boolean
          user_id?: string
          slug?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          created_at: string
          title: string
          slug: string
          content: string
          excerpt: string
          published: boolean
          published_at: string | null
          cover_image: string | null
          user_id: string
          tags: string[]
          reading_time: number
          likes: number
        }
        Insert: {
          id?: string
          created_at?: string
          title: string
          slug: string
          content: string
          excerpt: string
          published?: boolean
          published_at?: string | null
          cover_image?: string | null
          user_id: string
          tags?: string[]
          reading_time?: number
          likes?: number
        }
        Update: {
          id?: string
          created_at?: string
          title?: string
          slug?: string
          content?: string
          excerpt?: string
          published?: boolean
          published_at?: string | null
          cover_image?: string | null
          user_id?: string
          tags?: string[]
          reading_time?: number
          likes?: number
        }
      }
      contact_submissions: {
        Row: {
          id: string
          created_at: string
          name: string
          email: string
          message: string
          read: boolean
          responded: boolean
          subject: string | null
          response: string | null
          response_date: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          email: string
          message: string
          read?: boolean
          responded?: boolean
          subject?: string | null
          response?: string | null
          response_date?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          email?: string
          message?: string
          read?: boolean
          responded?: boolean
          subject?: string | null
          response?: string | null
          response_date?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          created_at: string
          full_name: string
          avatar_url: string | null
          bio: string | null
          skills: string[]
          resume_url: string | null
          linkedin_url: string | null
          github_url: string | null
          twitter_url: string | null
          website_url: string | null
          location: string | null
          available_for_hire: boolean
        }
        Insert: {
          id: string
          created_at?: string
          full_name: string
          avatar_url?: string | null
          bio?: string | null
          skills?: string[]
          resume_url?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          twitter_url?: string | null
          website_url?: string | null
          location?: string | null
          available_for_hire?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          full_name?: string
          avatar_url?: string | null
          bio?: string | null
          skills?: string[]
          resume_url?: string | null
          linkedin_url?: string | null
          github_url?: string | null
          twitter_url?: string | null
          website_url?: string | null
          location?: string | null
          available_for_hire?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}