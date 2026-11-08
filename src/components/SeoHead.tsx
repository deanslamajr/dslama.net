import Head from 'next/head';

import { appTitle, siteUrl } from '../constants';

type SeoHeadProps = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
};

const DESCRIPTION_LENGTH = 160;

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
      <meta key="twitter:card" name="twitter:card" content="summary" />
      {noIndex && <meta key="robots" name="robots" content="noindex" />}
    </Head>
  );
};
