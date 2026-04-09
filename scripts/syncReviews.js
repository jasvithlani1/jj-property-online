/**
 * Google Reviews to Sanity Sync Script
 * 
 * Usage:
 * 1. Add your GOOGLE_API_KEY and GOOGLE_PLACE_ID (.env or hardcoded)
 * 2. Run: node scripts/syncReviews.js
 * 
 * Prerequisites:
 * npm install @sanity/client isomorphic-fetch
 */

import { createClient } from '@sanity/client';
import fetch from 'isomorphic-fetch';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID,
  dataset: process.env.VITE_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN, // Requires write permissions
  useCdn: false,
  apiVersion: '2024-03-12',
});

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

async function syncReviews() {
  if (!GOOGLE_API_KEY || !PLACE_ID) {
    console.error('Error: GOOGLE_API_KEY and GOOGLE_PLACE_ID are required.');
    return;
  }

  console.log('Fetching reviews from Google...');
  
  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=reviews&key=${GOOGLE_API_KEY}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.status !== 'OK') {
      throw new Error(`Google API Error: ${data.status} - ${data.error_message || 'Unknown error'}`);
    }

    const reviews = data.result.reviews || [];
    console.log(`Found ${reviews.length} reviews. Syncing to Sanity...`);

    for (const review of reviews) {
      const doc = {
        _type: 'review',
        _id: `google-review-${review.time}`, // Use timestamp as stable ID
        name: review.author_name,
        text: review.text,
        rating: review.rating,
        date: review.relative_time_description,
        authorImage: review.profile_photo_url,
      };

      await client.createOrReplace(doc);
      console.log(`Synced review from: ${review.author_name}`);
    }

    console.log('Sync complete!');
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

syncReviews();
