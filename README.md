# Personal Portfolio Website

A beautiful, responsive portfolio website built with Next.js, Tailwind CSS, and Supabase. Features include authentication, project showcase, blog functionality, and contact form.

## Features

- **Authentication** - Secure login with Supabase Auth
- **Project Showcase** - Display your work with filterable project cards
- **Blog System** - Markdown-based blog with tags
- **Contact Form** - Form submissions stored in Supabase
- **Dark/Light Mode** - Toggle between themes
- **Responsive Design** - Works on all devices
- **Animations** - Subtle animations using Framer Motion

## Technologies Used

- **Frontend**:
  - Next.js
  - Tailwind CSS
  - Shadcn/UI Components
  - Framer Motion
  - React Hook Form
  - Zod form validation

- **Backend & Database**:
  - Supabase (Authentication, Database, Storage)
  - TypeScript for type safety

## Setup Instructions

### Prerequisites

- Node.js installed
- Supabase account

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

Create a `.env.local` file in the root directory with the following:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. Start the development server:

```bash
npm run dev
```

### Supabase Setup

1. Create a new Supabase project
2. Run the SQL migrations in `supabase/migrations/create_tables.sql`
3. Configure authentication:
   - Enable Email/Password sign-in

## Project Structure

```
portfolio/
├── app/                # Next.js app router pages
├── components/         # React components
├── lib/                # Utility functions and hooks
│   └── supabase/       # Supabase client and types
├── public/             # Static assets
└── supabase/           # Supabase migrations and types
```

## Customization

- Update project content in the database
- Add your own logo and favicon
- Modify theme colors in globals.css
- Add additional pages as needed

## Deployment

Build for production:

```bash
npm run build
```

You can deploy this application on Vercel, Netlify, or any other static site hosting platform.

## License

MIT