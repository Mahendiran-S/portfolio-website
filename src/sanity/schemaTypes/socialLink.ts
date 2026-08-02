import { defineField, defineType } from 'sanity';

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform Name',
      type: 'string',
      options: {
        list: [
          { title: 'GitHub', value: 'GitHub' },
          { title: 'LinkedIn', value: 'LinkedIn' },
          { title: 'Instagram', value: 'Instagram' },
          { title: 'Twitter / X', value: 'Twitter' },
          { title: 'LeetCode', value: 'LeetCode' },
          { title: 'CodeChef', value: 'CodeChef' },
          { title: 'HackerRank', value: 'HackerRank' },
          { title: 'Email', value: 'Email' },
          { title: 'Phone', value: 'Phone' },
          { title: 'Portfolio', value: 'Portfolio' },
        ],
      },
      validation: (R) => R.required(),
    }),
    defineField({ name: 'url', title: 'URL / Link', type: 'url', validation: (R) => R.required() }),
    defineField({ name: 'handle', title: 'Username / Handle', type: 'string', placeholder: 'e.g. @Mahendiran-S' }),
    defineField({ name: 'icon', title: 'Icon Name (optional)', type: 'string', description: 'Optional icon identifier e.g. FaGithub' }),
    defineField({ name: 'published', title: 'Visible?', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'platform', subtitle: 'handle' },
  },
});
