import { defineField, defineType } from 'sanity';

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  groups: [
    { name: 'personal', title: '👤 Personal Info' },
    { name: 'links', title: '🔗 Social Links' },
    { name: 'media', title: '📸 Media & Files' },
  ],
  fields: [
    defineField({ name: 'name', title: 'Full Name', type: 'string', group: 'personal', validation: (R) => R.required() }),
    defineField({ name: 'role', title: 'Job Title / Role', type: 'string', group: 'personal', validation: (R) => R.required() }),
    defineField({ name: 'tagline', title: 'Hero Tagline', type: 'text', rows: 2, group: 'personal' }),
    defineField({ name: 'aboutBio', title: 'About Bio (paragraph)', type: 'text', rows: 5, group: 'personal' }),
    defineField({ name: 'availability', title: 'Availability Status', type: 'string', group: 'personal', placeholder: 'e.g. Open for Roles & Internships' }),
    defineField({ name: 'yearsOfExperience', title: 'Years of Experience', type: 'number', group: 'personal' }),
    defineField({ name: 'email', title: 'Email Address', type: 'string', group: 'personal', validation: (R) => R.required() }),
    defineField({ name: 'phone', title: 'Phone Number', type: 'string', group: 'personal' }),
    defineField({ name: 'location', title: 'Location', type: 'string', group: 'personal', placeholder: 'e.g. Tamil Nadu, India' }),
    defineField({ name: 'college', title: 'College / University', type: 'string', group: 'personal' }),
    defineField({ name: 'portfolioUrl', title: 'Portfolio Website URL', type: 'url', group: 'links' }),
    defineField({ name: 'githubUrl', title: 'GitHub Profile URL', type: 'url', group: 'links' }),
    defineField({ name: 'githubUsername', title: 'GitHub Username', type: 'string', group: 'links', placeholder: 'e.g. Mahendiran-S' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url', group: 'links' }),
    defineField({ name: 'instagramUrl', title: 'Instagram URL', type: 'url', group: 'links' }),
    defineField({ name: 'twitterUrl', title: 'Twitter / X URL', type: 'url', group: 'links' }),
    defineField({
      name: 'profilePhoto',
      title: 'Profile Photo (Main)',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'resumeFile',
      title: 'Resume PDF',
      type: 'file',
      group: 'media',
      options: { accept: '.pdf' },
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'profilePhoto' },
  },
});
