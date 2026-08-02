import { defineField, defineType } from 'sanity';

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  groups: [
    { name: 'basic', title: '📋 Basic Info' },
    { name: 'details', title: '📝 Detailed Content' },
    { name: 'media', title: '🖼️ Media' },
    { name: 'links', title: '🔗 Links & Status' },
    { name: 'settings', title: '⚙️ Settings' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Project Name', type: 'string', group: 'basic', validation: (R) => R.required() }),
    defineField({ name: 'slug', title: 'Slug (URL-friendly)', type: 'slug', group: 'basic', options: { source: 'title', maxLength: 96 }, validation: (R) => R.required() }),
    defineField({ name: 'shortDescription', title: 'Short Description (card text)', type: 'text', rows: 2, group: 'basic', validation: (R) => R.required().max(300) }),
    defineField({ name: 'detailedDescription', title: 'Detailed Description', type: 'text', rows: 6, group: 'details' }),
    defineField({ name: 'problemStatement', title: 'Problem Statement', type: 'text', rows: 3, group: 'details' }),
    defineField({ name: 'solution', title: 'Solution', type: 'text', rows: 3, group: 'details' }),
    defineField({ name: 'architecture', title: 'Architecture Details', type: 'text', rows: 3, group: 'details' }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
      group: 'details',
    }),
    defineField({
      name: 'techStack',
      title: 'Tech Stack',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'basic',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      group: 'media',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      group: 'media',
      of: [{
        type: 'image',
        options: { hotspot: true },
        fields: [{ name: 'alt', title: 'Alt Text', type: 'string' }],
      }],
    }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url', group: 'links' }),
    defineField({ name: 'liveUrl', title: 'Live Demo URL', type: 'url', group: 'links' }),
    defineField({
      name: 'status',
      title: 'Project Status',
      type: 'string',
      group: 'links',
      options: {
        list: [
          { title: 'Featured', value: 'Featured' },
          { title: 'Completed', value: 'Completed' },
          { title: 'In Development', value: 'In Development' },
          { title: 'Production', value: 'Production' },
          { title: 'Archived', value: 'Archived' },
        ],
        layout: 'radio',
      },
      initialValue: 'Completed',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      group: 'links',
      options: {
        list: [
          { title: 'Full Stack', value: 'Full Stack' },
          { title: 'Frontend', value: 'Frontend' },
          { title: 'Backend', value: 'Backend' },
          { title: 'Mobile', value: 'Mobile' },
          { title: 'AI/ML', value: 'AI/ML' },
          { title: 'Design', value: 'Design' },
          { title: 'Open Source', value: 'Open Source' },
        ],
      },
    }),
    defineField({ name: 'completedDate', title: 'Completed Date', type: 'string', group: 'settings', placeholder: 'e.g. Jan 2025' }),
    defineField({ name: 'featured', title: 'Featured Project?', type: 'boolean', group: 'settings', initialValue: false }),
    defineField({ name: 'published', title: 'Published?', type: 'boolean', group: 'settings', initialValue: true }),
    defineField({ name: 'displayOrder', title: 'Display Order', type: 'number', group: 'settings', initialValue: 0 }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'thumbnail', featured: 'featured', published: 'published' },
    prepare({ title, subtitle, media, featured, published }) {
      const indicators = [featured ? '⭐' : '', published ? '' : '🔒'].filter(Boolean).join(' ');
      return { title: `${indicators} ${title}`.trim(), subtitle, media };
    },
  },
  orderings: [{ title: 'Display Order', name: 'displayOrderAsc', by: [{ field: 'displayOrder', direction: 'asc' }] }],
});
