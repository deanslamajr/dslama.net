import { MutationResolvers } from '../../../generated/graphql';
import {update} from '../postgresql/aboutPage';
import {ContextInterface} from '../../context';

export const resolver: Required<MutationResolvers<ContextInterface>['updateAboutPage']> = async (
  _parent, args, context, _info
) => {

  if ((context as ContextInterface).session.getAccountId()) {
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
  }

  throw new Error('Unauthorized!');
};
