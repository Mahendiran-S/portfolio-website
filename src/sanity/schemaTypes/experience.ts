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
    defineField({ name: 'location', title: 'Location', type: 'string', placeholder: 'e.g. Remote / Chennai, India' }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'string', placeholder: 'e.g. Jan 2024', validation: (R) => R.required() }),
    defineField({ name: 'endDate', title: 'End Date', type: 'string', placeholder: 'e.g. Jun 2024 (leave empty if current)' }),
    defineField({ name: 'currentJob', title: 'Currently Working Here?', type: 'boolean', initialValue: false }),
    defineField({ name: 'description', title: 'Summary', type: 'text', rows: 3 }),
    defineField({
      name: 'responsibilities',
      title: 'Key Responsibilities',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'website', title: 'Company Website', type: 'url' }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 0 }),
    defineField({ name: 'featured', title: 'Featured?', type: 'boolean', initialValue: false }),
    defineField({ name: 'published', title: 'Published?', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'role', subtitle: 'company', media: 'companyLogo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `@ ${subtitle}`, media };
    },
  },
  orderings: [{ title: 'Display Order', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] }],
});
