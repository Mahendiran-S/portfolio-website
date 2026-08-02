import { defineField, defineType } from 'sanity';
import { CertificateAutoFiller } from '../components/CertificateAutoFiller';

export const certificate = defineType({
  name: 'certificate',
  title: 'Certificate',
  type: 'document',
  components: {
    input: CertificateAutoFiller,
  },
  fields: [
    defineField({ name: 'title', title: 'Certificate Name', type: 'string', validation: (R) => R.required() }),
    defineField({
      name: 'certificateImage',
      title: 'Certificate Image',
      type: 'image',
      options: { hotspot: true },
      fields: [defineField({ name: 'alt', title: 'Alt Text', type: 'string' })],
    }),
    defineField({ name: 'issuer', title: 'Issued By', type: 'string', validation: (R) => R.required() }),
    defineField({ name: 'issueDate', title: 'Issue Date', type: 'string', placeholder: 'e.g. Jan 2024' }),
    defineField({ name: 'expiryDate', title: 'Expiry Date (optional)', type: 'string', placeholder: 'e.g. Jan 2027 or No Expiry' }),
    defineField({ name: 'credentialId', title: 'Credential ID', type: 'string' }),
    defineField({ name: 'verificationUrl', title: 'Verification URL', type: 'url' }),
    defineField({ name: 'downloadUrl', title: 'Download / View URL (optional)', type: 'url' }),
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
          { title: 'Coursera', value: 'Coursera' },
          { title: 'Udemy', value: 'Udemy' },
          { title: 'Other', value: 'Other' },
        ],
      },
      initialValue: 'Other',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({ name: 'featured', title: 'Featured?', type: 'boolean', initialValue: false }),
    defineField({ name: 'published', title: 'Published?', type: 'boolean', initialValue: true }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'issuer', media: 'certificateImage', category: 'category' },
    prepare({ title, subtitle, media, category }) {
      return { title, subtitle: `${subtitle} — ${category ?? ''}`, media };
    },
  },
});
