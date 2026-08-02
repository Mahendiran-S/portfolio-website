import { defineField, defineType } from 'sanity';

export const publication = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Publication Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'description', title: 'Description / Abstract', type: 'text', rows: 4 }),
    defineField({ name: 'url', title: 'Publication URL', type: 'url' }),
    defineField({ name: 'publisher', title: 'Publisher / Journal / Conference', type: 'string' }),
    defineField({ name: 'date', title: 'Publication Date', type: 'string', placeholder: 'e.g. Jan 2025' }),
    defineField({
      name: 'image',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({ name: 'published', title: 'Published?', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publisher', media: 'image' },
  },
});
