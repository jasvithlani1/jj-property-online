const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '7c1xj4wj',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-12',
});

async function run() {
  try {
    const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      excerpt,
      mainImage {
        asset,
        alt
      },
      publishedAt,
      featured,
      "categories": categories[]->{ title, color }
    }`;
    const posts = await client.fetch(postsQuery);
    console.log(`Fetched ${posts.length} posts successfully.`);
    for (const post of posts) {
      console.log({
        id: post._id,
        title: post.title,
        slug: post.slug,
        categories: post.categories,
        publishedAt: post.publishedAt
      });
    }
  } catch (error) {
    console.error('Error in query:', error);
  }
}

run();
