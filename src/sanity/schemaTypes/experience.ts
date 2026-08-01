import { defineField, defineType } from 'sanity';

export const experience = defineType({
  name: 'experience',
  title: 'Work Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'role',
      title: 'Job Role / Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internship', value: 'Internship' },
          { title: 'Full Time', value: 'Full Time' },
          { title: 'Freelance', value: 'Freelance' },
          { title: 'Contract', value: 'Contract' },
        ],
      },
    }),
    defineField({
      name: 'period',
      title: 'Period (e.g. Dec 2024 - Jan 2025)',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location / Remote',
      type: 'string',
    }),
    defineField({
      name: 'website',
      title: 'Company Website',
      type: 'url',
    }),
    defineField({
      name: 'responsibilities',
      title: 'Responsibilities & Bullet Points',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order (lower numbers appear first)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
