export const HTTP_PROTOCOLS = ['http:', 'https:'];
export const LINK_PROTOCOLS = ['http:', 'https:', 'mailto:'];

export const LIMITS = {
  shortText: 500, // titles, names, authors, publications
  url: 2048,
  longText: 5000, // page summaries, snippets, descriptions, project summaries
  quote: 10000,
  bio: 20000,
  items: 500, // entries in one list
};

export const isAllowedUrl = (value: string, protocols: string[]): boolean => {
  try {
    return protocols.indexOf(new URL(value).protocol) !== -1;
  } catch (error) {
    return false;
  }
};
