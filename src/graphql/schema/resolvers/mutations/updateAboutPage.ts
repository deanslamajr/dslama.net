import {AuthenticationError} from 'apollo-server-micro';

import { MutationResolvers } from '../../../generated/graphql';
import {update} from '../postgresql/aboutPage';
import {ContextInterface} from '../../context';
import { HTTP_PROTOCOLS, LIMITS, LINK_PROTOCOLS } from '../../../../contentPolicy';
import {
  assertMaxItems,
  assertMaxLength,
  normalizeOptionalUrl,
  normalizeUrl,
} from '../../validation';

export const resolver: Required<MutationResolvers<ContextInterface>>['updateAboutPage'] = async (
  _parent, args, context, _info
) => {

  if ((context as ContextInterface).session.getAccountId()) {
    const input = args.input;
    const rawLinks = assertMaxItems(input.links || [], 'links');
    const links = rawLinks.map((link, index) => ({
      name: assertMaxLength(link.name, LIMITS.shortText, `links[${index}].name`),
      url: normalizeUrl(link.url, `links[${index}].url`, LINK_PROTOCOLS),
    }));

    const data = await update({
      bio: assertMaxLength(input.bio || '', LIMITS.bio, 'bio'),
      title: assertMaxLength(input.title || '', LIMITS.shortText, 'title'),
      pictureURL: normalizeOptionalUrl(input.pictureURL || '', 'pictureURL', HTTP_PROTOCOLS),
      links: { create: links },
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
