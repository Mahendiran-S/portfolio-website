import { defineField, defineType } from 'sanity';

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Person Name', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'role', title: 'Role / Position', type: 'string' }),
    defineField({ name: 'company', title: 'Company / Organization', type: 'string' }),
    defineField({
      name: 'avatar',
      title: 'Profile Photo',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({ name: 'testimonial', title: 'Testimonial Text', type: 'text', rows: 4, validation: (R) => R.required() }),
    defineField({
      name: 'rating',
      title: 'Rating (out of 5)',
      type: 'number',
      validation: (R) => R.min(1).max(5),
      initialValue: 5,
    }),
    defineField({ name: 'featured', title: 'Featured?', type: 'boolean', initialValue: false }),
    defineField({ name: 'published', title: 'Published?', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'company', media: 'avatar' },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `@ ${subtitle ?? 'Unknown'}`, media };
    },
  },
});
