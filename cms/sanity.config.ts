import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { codeInput } from '@sanity/code-input';

import post from './schemas/post';
import author from './schemas/author';
import category from './schemas/category';
import caseStudy from './schemas/caseStudy';
import seoModule from './schemas/seoModule';
import siteSettings from './schemas/siteSettings';
import review from './schemas/review';
import inquiry from './schemas/inquiry';
import homePage from './schemas/homePage';
import aboutPage from './schemas/aboutPage';
import servicePage from './schemas/servicePage';
import contactPage from './schemas/contactPage';
import privacyPolicyPage from './schemas/privacyPolicyPage';
import termsAndConditionsPage from './schemas/termsAndConditionsPage';
import legalSection from './schemas/legalSection';
import servicesPage from './schemas/servicesPage';
import caseStudiesPage from './schemas/caseStudiesPage';
import blogPage from './schemas/blogPage';
import acquisition from './schemas/acquisition';

// Singleton helper — ensures only one siteSettings document can exist
const singletonActions = new Set(['publish', 'discardChanges', 'restore']);
const singletonTypes = new Set(['siteSettings']);

export default defineConfig({
  name: 'default',
  title: 'JJ Property Partner',

  projectId: '7c1xj4wj',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            // ── Singleton: Site Settings ──────────────────────────────────────
            S.listItem()
              .title('⚙️ Site Settings')
              .id('siteSettings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
            S.divider(),
            // ── Regular document types ────────────────────────────────────────
            S.listItem().title('🏠 Home Page').child(S.documentTypeList('homePage').title('Home Page')),
            S.listItem().title('ℹ️ About Page').child(S.documentTypeList('aboutPage').title('About Page')),
            S.listItem().title('🔧 Service Pages').child(S.documentTypeList('servicePage').title('Service Pages')),
            S.listItem().title('📋 Services Overview').child(S.documentTypeList('servicesPage').title('Services Overview')),
            S.listItem().title('📞 Contact Page').child(S.documentTypeList('contactPage').title('Contact Page')),
            S.listItem().title('💼 Case Studies').child(S.documentTypeList('caseStudy').title('Case Studies')),
            S.listItem().title('📈 Property Acquisitions').child(S.documentTypeList('acquisition').title('Property Acquisitions')),
            S.listItem().title('📁 Case Studies Page').child(S.documentTypeList('caseStudiesPage').title('Case Studies Page')),
            S.listItem().title('✍️ Blog Posts').child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem().title('📰 Blog Page').child(S.documentTypeList('blogPage').title('Blog Page')),
            S.listItem().title('⚖️ Privacy Policy').child(S.documentTypeList('privacyPolicyPage').title('Privacy Policy Page')),
            S.listItem().title('⚖️ Terms & Conditions').child(S.documentTypeList('termsAndConditionsPage').title('Terms & Conditions Page')),
            S.divider(),
            S.listItem().title('👤 Authors').child(S.documentTypeList('author').title('Authors')),
            S.listItem().title('🏷️ Categories').child(S.documentTypeList('category').title('Categories')),
            S.listItem().title('⭐ Reviews').child(S.documentTypeList('review').title('Reviews')),
            S.listItem().title('📩 Inquiries').child(S.documentTypeList('inquiry').title('Inquiries')),
          ]),
    }),
    visionTool(),
    codeInput(),
  ],

  document: {
    // Prevent creation of additional singleton documents
    newDocumentOptions: (prev, { creationContext }) => {
      if (creationContext.type === 'global') {
        return prev.filter((template) => !singletonTypes.has(template.templateId));
      }
      return prev;
    },
    actions: (prev, { schemaType }) => {
      if (singletonTypes.has(schemaType)) {
        return prev.filter(({ action }) => action && singletonActions.has(action));
      }
      return prev;
    },
  },

  schema: {
    types: [
      // Schemas
      siteSettings,
      seoModule,
      legalSection,
      // Page documents
      post,
      author,
      category,
      caseStudy,
      acquisition,
      review,
      inquiry,
      homePage,
      aboutPage,
      servicePage,
      contactPage,
      servicesPage,
      caseStudiesPage,
      blogPage,
      privacyPolicyPage,
      termsAndConditionsPage,
    ],
  },
});
