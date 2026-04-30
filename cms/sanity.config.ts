import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import post from './schemas/post';
import author from './schemas/author';
import category from './schemas/category';
import caseStudy from './schemas/caseStudy';
import seo from './schemas/seo';
import review from './schemas/review';
import inquiry from './schemas/inquiry';
import homePage from './schemas/homePage';
import aboutPage from './schemas/aboutPage';
import servicePage from './schemas/servicePage';
import contactPage from './schemas/contactPage';
import servicesPage from './schemas/servicesPage';
import caseStudiesPage from './schemas/caseStudiesPage';
import blogPage from './schemas/blogPage';

export default defineConfig({
  name: 'default',
  title: 'JJ Property Partner',

  projectId: '7c1xj4wj',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [
      post, 
      author, 
      category, 
      caseStudy, 
      seo, 
      review, 
      inquiry,
      homePage,
      aboutPage,
      servicePage,
      contactPage,
      servicesPage,
      caseStudiesPage,
      blogPage
    ],
  },
});
