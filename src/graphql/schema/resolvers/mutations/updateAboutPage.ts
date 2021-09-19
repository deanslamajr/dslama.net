import {AuthenticationError} from 'apollo-server-micro';

import { LinkInput, MutationResolvers } from '../../../generated/graphql';
import {update} from '../postgresql/aboutPage';
import {ContextInterface} from '../../context';

export const resolver: MutationResolvers<ContextInterface>['updateAboutPage'] = async (
  _parent, args, context, _info
) => {

  if ((context as ContextInterface).session.getAccountId()) {
    let links = [] as Array<LinkInput>;

    if (args.input.links !== null && args.input.links !== undefined) {
      args.input.links.forEach(link => {
        try {
          // if not remotely close to a url, can throw
          const uRL = encodeURI(link.url);
          links.push({
            name: link.name,
            url: uRL.toString()
          });
        }
        catch(error: any) {
          // TODO improve logging
          // TODO improve this behavior
          // don't do anything
        }
      });
    }

    const data = await update({
      bio: args.input.bio || '',
      links: {
        create: [
          ...links
        ]
      },
      pictureURL: args.input.pictureURL || '',
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

  throw new AuthenticationError('This action requires an authenticated account.');
};
