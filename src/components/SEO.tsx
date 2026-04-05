import React from 'react';
import { Helmet } from 'react-helmet-async';
import { urlFor } from '../lib/sanity';

interface SEOProps {
  title?: string;
  description?: string;
  image?: any;
  article?: boolean;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, article }) => {
  const siteName = 'JJ Property Partner';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const imageUrl = image ? urlFor(image).width(1200).height(630).url() : '/logo.png';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || 'Sydney\'s leading independent buyers agent.'} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;
