import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import post from './schemas/post';
import author from './schemas/author';
import category from './schemas/category';
import caseStudy from './schemas/caseStudy';
import seo from './schemas/seo';

export default defineConfig({
  name: 'default',
  title: 'JJ Property Partner',

  projectId: '7c1xj4wj',
  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: [post, author, category, caseStudy, seo],
  },
});
