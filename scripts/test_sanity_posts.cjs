const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: '7c1xj4wj',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-03-12',
});

// Override fetch dynamically
const originalFetch = client.fetch.bind(client);
client.fetch = function (query, params, options) {
  console.log('Intercepted fetch! Injecting timestamp cache-buster...');
  const cacheBustedParams = {
    ...params,
    t: Date.now()
  };
  return originalFetch(query, cacheBustedParams, options);
};

async function run() {
  try {
    const postsQuery = `*[_type == "post"] | order(publishedAt desc)[0...2] {
      _id,
      title
    }`;

    console.log('Executing query...');
    const posts = await client.fetch(postsQuery);
    console.log(`Successfully fetched ${posts.length} posts!`);
    console.log(posts);

  } catch (error) {
    console.error('ERROR:', error);
  }
}

run();
