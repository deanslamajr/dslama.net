import { Resolver, AboutPage } from '../types/about.graphqls';
import {fetchMostRecentVersion as fetchMostRecentAboutPageData} from './postgresql/aboutPage';

export const resolver: Resolver<AboutPage> = async (
  _parent, _args, _context, _info
) => {
  const data = await fetchMostRecentAboutPageData();

  return {
    links: data?.links,
    version: data?.version,
    pictureURL: data?.pictureURL,
    bio: data?.bio,
    title: data?.title,
  };
};
