import { MutationResolvers } from '../types/about.graphqls';
import {update} from '../postgresql/aboutPage';

export const resolver: Required<MutationResolvers['updateAboutPage']> = async (
  _parent, args, _context, _info
) => {

  const data = await update({
    bio: '',
    pictureURL: '',
    title: args.input.title || '',
  });

  return {
    links: data?.links,
    version: data?.version,
    pictureURL: data?.pictureURL,
    bio: data?.bio,
    title: data?.title,
  };
};
