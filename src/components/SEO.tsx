import React from 'react';
import { Helmet } from 'react-helmet-async';
import { urlFor } from '../lib/sanity';

interface SEOProps {
  title?: string;
  description?: string;
  image?: any;
  article?: boolean;
  keywords?: string[];
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image, article, keywords, canonical }) => {
  const siteName = 'JJ Property Partner';
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const imageUrl = image ? (image.asset ? urlFor(image).width(1200).height(630).url() : image) : '/logo.png';
  const defaultDesc = 'Sydney\'s leading independent buyers agent. Data-driven property acquisition across Australia.';

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDesc} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      {canonical && <link rel="canonical" href={canonical} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? 'article' : 'website'} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDesc} />
      <meta property="og:image" content={imageUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDesc} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;
