import { NextApiRequest, NextApiResponse } from 'next';

import { siteUrl } from '../constants';

export type AtomEntry = {
  title: string;
  url: string;
  updated: Date;
  summary: string;
};

type AtomFeed = {
  title: string;
  selfUrl: string;
  pageUrl: string;
  updated: Date;
  entries: AtomEntry[];
};

export const escapeXml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');

// Child rows get new database ids on every save, so the item URL is the entry id.
const uniqueByUrl = (entries: AtomEntry[]): AtomEntry[] => {
  const seen: { [url: string]: boolean } = {};
  return entries.filter(entry => {
    if (seen[entry.url]) {
      return false;
    }
    seen[entry.url] = true;
    return true;
  });
};

const buildEntry = (entry: AtomEntry): string =>
  [
    '  <entry>',
    `    <title>${escapeXml(entry.title)}</title>`,
    `    <id>${escapeXml(entry.url)}</id>`,
    `    <link rel="alternate" href="${escapeXml(entry.url)}"/>`,
    `    <updated>${entry.updated.toISOString()}</updated>`,
    `    <summary>${escapeXml(entry.summary)}</summary>`,
    '  </entry>',
  ].join('\n');

export const buildAtomFeed = ({
  title,
  selfUrl,
  pageUrl,
  updated,
  entries,
}: AtomFeed): string =>
  [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <title>${escapeXml(title)}</title>`,
    `  <id>${escapeXml(selfUrl)}</id>`,
    `  <link rel="self" href="${escapeXml(selfUrl)}"/>`,
    `  <link rel="alternate" href="${escapeXml(pageUrl)}"/>`,
    `  <updated>${updated.toISOString()}</updated>`,
    '  <author><name>dean slama</name></author>',
    ...uniqueByUrl(entries).map(buildEntry),
    '</feed>',
    '',
  ].join('\n');

type FeedSource = {
  title: string;
  path: string;
  pagePath: string;
  load: () => Promise<{ updated: Date; entries: AtomEntry[] } | null>;
};

export const createFeedHandler = ({
  title,
  path,
  pagePath,
  load,
}: FeedSource) => async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD');
    res.status(405).end();
    return;
  }

  let feed;
  try {
    feed = await load();
  } catch (error) {
    console.error(error);
    res.status(503).end();
    return;
  }

  const entries = (feed?.entries || [])
    .slice()
    .sort((a, b) => b.updated.getTime() - a.updated.getTime());

  res.setHeader('Content-Type', 'application/atom+xml; charset=utf-8');
  res.setHeader('Cache-Control', 'public, max-age=3600');
  res.status(200).send(
    buildAtomFeed({
      title,
      selfUrl: siteUrl + path,
      pageUrl: siteUrl + pagePath,
      updated: feed?.updated || new Date(0),
      entries,
    })
  );
};
