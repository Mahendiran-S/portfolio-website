import { defineField, defineType } from 'sanity';

export const hackathon = defineType({
  name: 'hackathon',
  title: 'Hackathon',
  type: 'document',
  fields: [
    defineField({ name: 'eventName', title: 'Event Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'organizer', title: 'Organizer', type: 'string' }),
    defineField({ name: 'result', title: 'Result / Position', type: 'string', placeholder: 'e.g. 1st Place, Finalist, Participant' }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({
      name: 'certificate',
      title: 'Certificate Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({ name: 'date', title: 'Date', type: 'string', placeholder: 'e.g. Jan 2024' }),
    defineField({ name: 'teamSize', title: 'Team Size', type: 'number', initialValue: 1 }),
    defineField({ name: 'prize', title: 'Prize / Award', type: 'string', placeholder: 'e.g. ₹5,000 Cash Prize' }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'published', title: 'Published?', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'eventName', subtitle: 'result', media: 'certificate' },
  },
});
