import { defineField, defineType } from 'sanity';

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Skill Name', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'Frontend' },
          { title: 'Backend', value: 'Backend' },
          { title: 'Database', value: 'Database' },
          { title: 'Tools', value: 'Tools' },
          { title: 'DevOps', value: 'DevOps' },
          { title: 'Mobile', value: 'Mobile' },
          { title: 'AI/ML', value: 'AI/ML' },
          { title: 'Design', value: 'Design' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({
      name: 'percentage',
      title: 'Proficiency (%)',
      type: 'number',
      validation: (R) => R.required().min(0).max(100),
      description: 'Enter a number between 0 and 100',
    }),
    defineField({ name: 'iconName', title: 'Icon Name', type: 'string', description: 'e.g. SiReact, SiNodedotjs (from react-icons/si)' }),
    defineField({ name: 'description', title: 'Short Description', type: 'string' }),
    defineField({ name: 'featured', title: 'Featured?', type: 'boolean', initialValue: false }),
    defineField({ name: 'published', title: 'Published?', type: 'boolean', initialValue: true }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'category', percentage: 'percentage' },
    prepare({ title, subtitle, percentage }) {
      return { title, subtitle: `${subtitle} — ${percentage ?? 0}%` };
    },
  },
  orderings: [{ title: 'Category & Order', name: 'categoryAsc', by: [{ field: 'category', direction: 'asc' }, { field: 'displayOrder', direction: 'asc' }] }],
});
