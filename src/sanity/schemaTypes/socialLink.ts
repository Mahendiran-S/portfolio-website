import { defineField, defineType } from 'sanity';

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Links',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform Name (e.g. LinkedIn, GitHub, Instagram)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'handle',
      title: 'Display Handle (e.g. @toxin_artist_0210)',
      type: 'string',
    }),
  ],
});
