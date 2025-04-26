'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  ArrowRight,
  Award,
  Code,
  Download,
  GraduationCap,
  Monitor,
  UserRound,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function AboutPage() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <div className="container py-12">
      <div className="max-w-4xl mx-auto space-y-16">
        {/* Hero Section */}
        <motion.section
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight">About Me</h1>
          <p className="text-muted-foreground text-lg">
            Passionate about applying Biotechnology to solve real-world problems
            in healthcare, sustainability, and beyond.
          </p>
        </motion.section>

        {/* Bio Section */}
        <section className="grid md:grid-cols-[2fr_1fr] gap-8 items-start">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="inline-flex items-center gap-2 text-primary">
              <UserRound className="h-5 w-5" />
              <h2 className="text-2xl font-semibold">Biography</h2>
            </div>
            <p>
              I'm Amit Mohapatra, a 3rd-year Biotechnology Engineering student
              at Chandigarh University with a growing passion for scientific
              research and innovation. My journey in biotechnology has been
              driven by curiosity and a desire to explore how biological systems
              can be harnessed to solve real-world challenges.
            </p>
            <p>
              My academic focus includes molecular biology, genetic engineering,
              and bioinformatics, and I'm particularly interested in research
              that bridges biotechnology with cutting-edge technologies. Whether
              it's through lab work or literature reviews, I enjoy diving deep
              into complex problems and contributing to meaningful scientific
              advancements.
            </p>
            <p>
              Outside the lab, you’ll find me hiking, reading scientific
              literature, or exploring emerging trends in biotech and health
              tech. I’m committed to continuous learning and aspire to make a
              positive impact through research and collaboration.
            </p>
            <div className="flex gap-4 pt-4">
              <Button asChild>
                <Link href="/contact">
                  Get in Touch <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="#" download>
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="rounded-xl overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src="/images/profile.jpg"
              alt="Profile"
              className="w-100 h-full object-cover"
            />
          </motion.div>
        </section>

        {/* Skills Section */}
        <motion.section
          className="space-y-6"
          {...fadeIn}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center gap-2 text-primary">
            <Code className="h-5 w-5" />
            <h2 className="text-2xl font-semibold">Skills & Technologies</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              {
                category: 'Bio-Instrumentation',
                skills: [
                  'UV-VIS Spectroscopy',
                  'GEL Electrophoresis',
                  'SDS-PAGE',
                  'PCR',
                  'ELISA',
                ],
              },
              {
                category: 'Laboratory Skills',
                skills: [
                  'Tissue-Culturing',
                  'Media Preparations',
                  'Molecular Biology',
                  'Medical Diagnostic Techniques',
                  'Analytical Techniques',
                ],
              },
            ].map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="space-y-3"
              >
                <h3 className="font-medium">{skillGroup.category}</h3>
                <ul className="space-y-2">
                  {skillGroup.skills.map((skill) => (
                    <li key={skill} className="flex items-center gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                      <span>{skill}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        {/* <motion.section
          className="space-y-6"
          {...fadeIn}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 text-primary">
            <Monitor className="h-5 w-5" />
            <h2 className="text-2xl font-semibold">Work Experience</h2>
          </div>

          <div className="space-y-8">
            {[
              {
                title: 'Senior Frontend Developer',
                company: 'Tech Solutions Inc.',
                period: '2021 - Present',
                description:
                  'Lead the development of a complex SaaS platform using React, TypeScript, and GraphQL. Implemented CI/CD pipelines and improved performance by 40%.',
              },
              {
                title: 'Full-Stack Developer',
                company: 'Digital Innovations',
                period: '2019 - 2021',
                description:
                  'Developed and maintained multiple web applications using the MERN stack. Collaborated with UX designers to implement responsive interfaces.',
              },
              {
                title: 'Junior Web Developer',
                company: 'Creative Web Agency',
                period: '2017 - 2019',
                description:
                  'Built client websites using React and Node.js. Participated in all stages of the development lifecycle from planning to deployment.',
              },
            ].map((job, index) => (
              <motion.div
                key={job.title}
                className="relative pl-6 border-l"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
              >
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 top-1.5" />
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">{job.title}</h3>
                  <p className="text-sm text-primary font-medium">
                    {job.company}
                  </p>
                  <p className="text-sm text-muted-foreground">{job.period}</p>
                  <p className="mt-2">{job.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section> */}

        {/* Education Section */}
        <motion.section
          className="space-y-6"
          {...fadeIn}
          transition={{ duration: 0.5, delay: 0.7 }}
        >
          <div className="inline-flex items-center gap-2 text-primary">
            <GraduationCap className="h-5 w-5" />
            <h2 className="text-2xl font-semibold">Education</h2>
          </div>

          <div className="space-y-6">
            {[
              {
                degree: 'Bachelor of Engineering in Biotechnology',
                school: 'Chandigarh University',
                period: '2023 - 2027',
                description:
                  'Curriculum focused on foundational life sciences, with hands-on training in modern biotech tools and laboratory methods.',
              },
              {
                degree: 'Intermediate',
                school: 'Loyola School',
                period: '2021 - 2023',
                description:
                  'Strong foundation in core scientific disciplines — Physics, Chemistry, Mathematics, and Biology — with a growing focus on analytical thinking, problem-solving, and scientific reasoning.',
              },
              {
                degree: 'Matriculation',
                school: 'Loyola School',
                period: '2020 - 2021',
                description:
                  'Strong academic foundation with emphasis on analytical thinking, logical reasoning, and structured problem-solving developed through the ISC curriculum.',
              },
            ].map((edu, index) => (
              <motion.div
                key={edu.degree}
                className="relative pl-6 border-l"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="absolute w-3 h-3 bg-primary rounded-full -left-1.5 top-1.5" />
                <div className="space-y-1">
                  <h3 className="text-lg font-medium">{edu.degree}</h3>
                  <p className="text-sm text-primary font-medium">
                    {edu.school}
                  </p>
                  <p className="text-sm text-muted-foreground">{edu.period}</p>
                  <p className="mt-2">{edu.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certificates Section */}
        {/* <motion.section
          className="space-y-6"
          {...fadeIn}
          transition={{ duration: 0.5, delay: 0.9 }}
        >
          <div className="inline-flex items-center gap-2 text-primary">
            <Award className="h-5 w-5" />
            <h2 className="text-2xl font-semibold">Certifications</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                name: 'AWS Certified Developer',
                issuer: 'Amazon Web Services',
                date: '2022',
              },
              {
                name: 'Professional Front-End Developer',
                issuer: 'Frontend Masters',
                date: '2021',
              },
              {
                name: 'React Advanced Patterns',
                issuer: 'React Training',
                date: '2020',
              },
              {
                name: 'Full-Stack JavaScript',
                issuer: 'Udemy',
                date: '2019',
              },
            ].map((cert, index) => (
              <motion.div
                key={cert.name}
                className="bg-muted/40 p-4 rounded-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.0 + index * 0.1 }}
              >
                <h3 className="font-medium">{cert.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {cert.issuer} • {cert.date}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section> */}
      </div>
    </div>
  );
}
