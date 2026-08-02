import { defineField, defineType } from 'sanity';

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Service Title', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'description', title: 'Description', type: 'text', rows: 3 }),
    defineField({ name: 'icon', title: 'Icon Name', type: 'string', description: 'Icon identifier e.g. FaCode, MdDesignServices' }),
    defineField({
      name: 'features',
      title: 'What\'s Included',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({ name: 'price', title: 'Price / Starting From', type: 'string', placeholder: 'e.g. ₹5,000 or Contact for pricing' }),
    defineField({ name: 'featured', title: 'Featured?', type: 'boolean', initialValue: false }),
    defineField({ name: 'published', title: 'Published?', type: 'boolean', initialValue: true }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'price' },
  },
});
