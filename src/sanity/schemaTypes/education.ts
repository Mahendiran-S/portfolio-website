import { defineField, defineType } from 'sanity';

export const education = defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'college',
      title: 'College / University Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'degree',
      title: 'Degree (e.g. Bachelor of Information Technology)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'branch',
      title: 'Branch / Specialization',
      type: 'string',
    }),
    defineField({
      name: 'startYear',
      title: 'Start Year',
      type: 'string',
    }),
    defineField({
      name: 'endYear',
      title: 'End Year',
      type: 'string',
    }),
    defineField({
      name: 'period',
      title: 'Period Display (e.g. June 2024 - June 2028)',
      type: 'string',
    }),
    defineField({
      name: 'cgpa',
      title: 'CGPA / Grade',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'logo',
      title: 'Institution Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
