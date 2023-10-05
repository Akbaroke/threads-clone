import React from 'react';
import Head from 'next/head';

export const HeadMetaData: React.FC<{
  title?: string;
  metaDescription?: string;
  ogImageUrl?: string;
  pathname?: string;
}> = ({
  title = 'Home',
  metaDescription,
  ogImageUrl = 'https://bluelinks.com.br/wp-content/uploads/2023/07/threads-logo-640x320.png',
  pathname = '',
}) => {
  const defaultTitle = 'Threads';

  const baseUrl = 'http://localhost:3000';

  const pageUrl = new URL(pathname, baseUrl).toString();
  const pageTitle = title ? `${title + ' | ' + defaultTitle}` : defaultTitle;

  return (
    <Head>
      <title>{pageTitle}</title>

      {/* metadata */}
      <meta name="title" content={pageTitle} />
      <meta name="description" content={metaDescription} />
      <meta name="og:image" itemProp="image" content={ogImageUrl} />
      <meta property="og:url" content={pageUrl} />

      <meta property="og:type" content="website" />
      <meta property="og:image" itemProp="image" content={ogImageUrl} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={metaDescription} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={pageUrl} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:image" content={ogImageUrl} />
      <meta property="twitter:description" content={metaDescription} />
    </Head>
  );
};
