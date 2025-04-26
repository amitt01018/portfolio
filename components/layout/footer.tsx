import Link from 'next/link';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="container py-8 md:py-12">
        <div className="mx-auto max-w-5xl text-center">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 justify-center text-left md:text-center">
            {/* Portfolio Description */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Portfolio</h3>
              <p className="text-sm text-muted-foreground">
                A showcase of my work and skills as a Biotechnology enthusiast.
              </p>
            </div>

            {/* Navigation Links */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Links</h3>
              <ul className="space-y-2">
                {[
                  { href: '/', label: 'Home' },
                  { href: '/about', label: 'About' },
                  { href: '/projects', label: 'Projects' },
                  { href: '/blog', label: 'Blog' },
                  { href: '/contact', label: 'Contact' },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h3 className="text-lg font-medium">Social</h3>
              <ul className="space-y-2">
                {[
                  { href: 'https://github.com', label: 'GitHub', icon: Github },
                  {
                    href: 'https://linkedin.com',
                    label: 'LinkedIn',
                    icon: Linkedin,
                  },
                  {
                    href: 'https://twitter.com',
                    label: 'Twitter',
                    icon: Twitter,
                  },
                  {
                    href: 'mailto:hello@example.com',
                    label: 'Email',
                    icon: Mail,
                  },
                ].map((social) => (
                  <li key={social.href}>
                    <Link
                      href={social.href}
                      className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <social.icon className="h-4 w-4" />
                      <span>{social.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="mt-10 border-t pt-6">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Portfolio. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
