import { Resolver, HomePayload } from '../types/home.graphqls';
import { get as getAbout } from './models/about';

export const resolver: Resolver<HomePayload> = async (
  _parent,
  _args,
  _context,
  _info
) => {
  const data = await getAbout();

  return {
    links: data?.links,
    version: data?.version,
    pictureURL: data?.pictureURL,
    bio: data?.bio,
    title: data?.title,
  };
};
