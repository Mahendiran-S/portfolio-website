import { defineField, defineType } from 'sanity';

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({ name: 'college', title: 'College / University', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'degree', title: 'Degree', type: 'string', validation: (R) => R.required(), placeholder: 'e.g. B.Tech' }),
    defineField({ name: 'department', title: 'Department / Branch', type: 'string', placeholder: 'e.g. Information Technology' }),
    defineField({ name: 'startYear', title: 'Start Year', type: 'string', placeholder: 'e.g. 2022' }),
    defineField({ name: 'endYear', title: 'End Year', type: 'string', placeholder: 'e.g. 2026 or Present' }),
    defineField({ name: 'period', title: 'Period (display text)', type: 'string', placeholder: 'e.g. 2022 – 2026' }),
    defineField({ name: 'cgpa', title: 'CGPA / Percentage', type: 'string', placeholder: 'e.g. 8.2 / 10' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'logo',
      title: 'Institution Logo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({ name: 'published', title: 'Published?', type: 'boolean', initialValue: true }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'college', subtitle: 'degree', media: 'logo' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
});
