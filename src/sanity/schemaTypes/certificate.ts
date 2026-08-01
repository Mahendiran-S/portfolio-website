import { defineField, defineType } from 'sanity';

export const certificate = defineType({
  name: 'certificate',
  title: 'Certificates',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Unique Identifier',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Certificate Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'issuer',
      title: 'Issuer / Organization',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'AWS', value: 'AWS' },
          { title: 'NPTEL', value: 'NPTEL' },
          { title: 'Internship', value: 'Internship' },
          { title: 'Hackathons', value: 'Hackathons' },
          { title: 'Workshops', value: 'Workshops' },
        ],
      },
    }),
    defineField({
      name: 'date',
      title: 'Issued Date',
      type: 'string',
    }),
    defineField({
      name: 'credentialId',
      title: 'Credential ID',
      type: 'string',
    }),
    defineField({
      name: 'downloadUrl',
      title: 'Verification / Download URL',
      type: 'string',
    }),
    defineField({
      name: 'certificateImage',
      title: 'Certificate Image / Badge',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
