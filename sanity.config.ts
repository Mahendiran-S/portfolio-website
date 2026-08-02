import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './src/sanity/schemaTypes';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production';

export default defineConfig({
  name: 'mahendiran-portfolio-cms',
  title: '⚡ Mahendiran Portfolio CMS',
  projectId,
  dataset,
  basePath: '/studio',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Portfolio Content')
          .items([
            S.listItem().title('👤 Profile').id('profile').child(
              S.documentList().title('Profile').filter('_type == "profile"')
            ),
            S.divider(),
            S.listItem().title('💼 Experience').id('experience').child(
              S.documentList().title('Experience').filter('_type == "experience"').defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
            ),
            S.listItem().title('🚀 Projects').id('project').child(
              S.documentList().title('Projects').filter('_type == "project"').defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
            ),
            S.listItem().title('🏆 Certificates').id('certificate').child(
              S.documentList().title('Certificates').filter('_type == "certificate"').defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
            ),
            S.listItem().title('🛠️ Skills').id('skill').child(
              S.documentList().title('Skills').filter('_type == "skill"').defaultOrdering([{ field: 'category', direction: 'asc' }])
            ),
            S.listItem().title('🎓 Education').id('education').child(
              S.documentList().title('Education').filter('_type == "education"')
            ),
            S.divider(),
            S.listItem().title('🏅 Achievements').id('achievement').child(
              S.documentList().title('Achievements').filter('_type == "achievement"')
            ),
            S.listItem().title('⚡ Hackathons').id('hackathon').child(
              S.documentList().title('Hackathons').filter('_type == "hackathon"')
            ),
            S.listItem().title('📚 Workshops').id('workshop').child(
              S.documentList().title('Workshops').filter('_type == "workshop"')
            ),
            S.listItem().title('📝 Publications').id('publication').child(
              S.documentList().title('Publications').filter('_type == "publication"')
            ),
            S.divider(),
            S.listItem().title('⭐ Testimonials').id('testimonial').child(
              S.documentList().title('Testimonials').filter('_type == "testimonial"')
            ),
            S.listItem().title('🎯 Services').id('service').child(
              S.documentList().title('Services').filter('_type == "service"').defaultOrdering([{ field: 'displayOrder', direction: 'asc' }])
            ),
            S.divider(),
            S.listItem().title('📄 Resume').id('resume').child(
              S.documentList().title('Resume').filter('_type == "resume"')
            ),
            S.listItem().title('🔗 Social Links').id('socialLink').child(
              S.documentList().title('Social Links').filter('_type == "socialLink"')
            ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
