import { defineField, defineType } from 'sanity';

export const experience = defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ name: 'company', title: 'Company Name', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({ name: 'role', title: 'Job Role / Title', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'employmentType',
      title: 'Employment Type',
      type: 'string',
      options: {
        list: [
          { title: 'Internship', value: 'Internship' },
          { title: 'Full Time', value: 'Full Time' },
          { title: 'Part Time', value: 'Part Time' },
          { title: 'Freelance', value: 'Freelance' },
          { title: 'Contract', value: 'Contract' },
        ],
        layout: 'radio',
      },
      initialValue: 'Internship',
    }),
    defineField({ name: 'location', title: 'Location', type: 'string', placeholder: 'e.g. Bengaluru / Remote' }),
    defineField({ name: 'remote', title: 'Is Remote?', type: 'boolean', initialValue: false }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'string', placeholder: 'e.g. Jul 2026', validation: (R) => R.required() }),
    defineField({ name: 'endDate', title: 'End Date', type: 'string', placeholder: 'e.g. Aug 2026 or Present' }),
    defineField({ name: 'currentJob', title: 'Current Position?', type: 'boolean', initialValue: false }),
    defineField({ name: 'shortDescription', title: 'Short Overview', type: 'text', rows: 2 }),
    defineField({
      name: 'coreModules',
      title: 'Core Modules Engineered',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Module',
          fields: [
            defineField({ name: 'title', title: 'Module Title', type: 'string', validation: (R) => R.required() }),
            defineField({ name: 'description', title: 'Description', type: 'string' }),
          ],
        },
      ],
    }),
    defineField({
      name: 'responsibilities',
      title: 'Key Responsibilities & Impact',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'achievements',
      title: 'Key Achievements (optional)',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'website', title: 'Company Website URL', type: 'url' }),
    defineField({ name: 'displayOrder', title: 'Display Order (lower numbers appear first)', type: 'number', initialValue: 0 }),
    defineField({ name: 'featured', title: 'Featured Experience?', type: 'boolean', initialValue: true }),
    defineField({ name: 'published', title: 'Published?', type: 'boolean', initialValue: true }),
    defineField({ name: 'themeColor', title: 'Theme Accent Color (hex or CSS color)', type: 'string', placeholder: '#22c55e' }),
  ],
  preview: {
    select: { title: 'role', subtitle: 'company', media: 'companyLogo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `@ ${subtitle}`, media };
    },
  },
  orderings: [
    { title: 'Display Order', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] },
    { title: 'Start Date Latest', name: 'startDateDesc', by: [{ field: 'startDate', direction: 'desc' }] },
  ],
});
