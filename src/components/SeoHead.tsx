import Head from 'next/head';

import { appTitle, siteUrl } from '../constants';

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

const DESCRIPTION_LENGTH = 160;
// One static preview image for every page, 1200 by 630 (public/og.png).
const OG_IMAGE = {
  path: '/og.png',
  width: '1200',
  height: '630',
  alt: 'dean slama: posts, projects, and readings',
};

export const SeoHead: React.FC<SeoHeadProps> = ({
  title,
  description,
  path,
  noIndex,
}) => {
  const shortDescription = description.slice(0, DESCRIPTION_LENGTH).trim();
  const url = siteUrl + path;

  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={shortDescription} />
      <link key="canonical" rel="canonical" href={url} />
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={shortDescription}
      />
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:site_name" property="og:site_name" content={appTitle} />
      <meta
        key="og:image"
        property="og:image"
        content={siteUrl + OG_IMAGE.path}
      />
      <meta
        key="og:image:width"
        property="og:image:width"
        content={OG_IMAGE.width}
      />
      <meta
        key="og:image:height"
        property="og:image:height"
        content={OG_IMAGE.height}
      />
      <meta key="og:image:alt" property="og:image:alt" content={OG_IMAGE.alt} />
      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      {noIndex && <meta key="robots" name="robots" content="noindex" />}
    </Head>
  );
};
