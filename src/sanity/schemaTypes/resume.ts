import { defineField, defineType } from 'sanity';

export const resume = defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({
      name: 'resumePdf',
      title: 'Resume PDF File',
      type: 'file',
      options: { accept: '.pdf' },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'version', title: 'Version', type: 'string', placeholder: 'e.g. v1.0, 2026-Jan', initialValue: 'v1.0' }),
    defineField({ name: 'lastUpdated', title: 'Last Updated', type: 'string', placeholder: 'e.g. January 2026' }),
    defineField({ name: 'notes', title: 'Notes (internal)', type: 'text', rows: 2 }),
    defineField({ name: 'published', title: 'Active Resume (use this for downloads)?', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'version', subtitle: 'lastUpdated', published: 'published' },
    prepare({ title, subtitle, published }) {
      return { title: `Resume ${title ?? ''}`, subtitle: `${published ? '✅ Active' : '🔒 Inactive'} — Updated: ${subtitle ?? 'N/A'}` };
    },
  },
});
