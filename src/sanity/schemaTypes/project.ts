import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Projects',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'Project Unique Identifier (slug)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Full Stack Application', value: 'Full Stack Application' },
          { title: 'Web Application', value: 'Web Application' },
          { title: 'Design & Full Stack', value: 'Design & Full Stack' },
          { title: 'Frontend', value: 'Frontend' },
          { title: 'Backend', value: 'Backend' },
          { title: 'Mobile', value: 'Mobile' },
          { title: 'AI Integration', value: 'AI Integration' },
        ],
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Summary',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'longDescription',
      title: 'Detailed Case Study Overview',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'image',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies & Stack',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'features',
      title: 'Key Features List',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'architectureDetails',
      title: 'Architecture & Implementation Details',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'githubUrl',
      title: 'GitHub Source URL',
      type: 'url',
    }),
    defineField({
      name: 'liveUrl',
      title: 'Live Demo URL',
      type: 'url',
    }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      options: {
        list: [
          { title: 'Featured', value: 'Featured' },
          { title: 'Completed', value: 'Completed' },
          { title: 'In Development', value: 'In Development' },
          { title: 'Production', value: 'Production' },
        ],
      },
      initialValue: 'Featured',
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
  ],
});
