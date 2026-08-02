import { defineField, defineType } from 'sanity';

export const workshop = defineType({
  name: 'workshop',
  title: 'Workshop',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Workshop Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'organizer', title: 'Organizer', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'certificate',
      title: 'Certificate Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({ name: 'date', title: 'Date', type: 'string', placeholder: 'e.g. March 2024' }),
    defineField({ name: 'duration', title: 'Duration', type: 'string', placeholder: 'e.g. 2 Days, 8 Hours' }),
    defineField({ name: 'published', title: 'Published?', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'organizer', media: 'certificate' },
  },
});
