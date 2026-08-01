import { defineField, defineType } from 'sanity';

export const resume = defineType({
  name: 'resume',
  title: 'Resume Document',
  type: 'document',
  fields: [
    defineField({
      name: 'resumePdf',
      title: 'Uploaded Resume PDF File',
      type: 'file',
      options: { accept: '.pdf' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastUpdated',
      title: 'Last Updated Date',
      type: 'string',
    }),
    defineField({
      name: 'version',
      title: 'Version Label (e.g. 2026 Official)',
      type: 'string',
    }),
  ],
});
