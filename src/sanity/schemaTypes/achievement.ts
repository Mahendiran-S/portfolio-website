import { defineField, defineType } from 'sanity';

export const achievement = defineType({
  name: 'achievement',
  title: 'Achievements',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Achievement Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'date',
      title: 'Date / Year',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Achievement Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
