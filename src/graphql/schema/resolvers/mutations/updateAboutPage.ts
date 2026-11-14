import { Prisma } from '@prisma/client';

import {
  MutationResolvers,
  UpdateAboutPageInput,
} from '../../../generated/graphql';
import { update } from '../postgresql/aboutPage';
import { ContextInterface } from '../../context';
import { requireActiveAccount } from '../../auth';
import {
  HTTP_PROTOCOLS,
  LIMITS,
  LINK_PROTOCOLS,
} from '../../../../contentPolicy';
import {
  assertMaxItems,
  assertMaxLength,
  normalizeOptionalUrl,
  normalizeUrl,
} from '../../validation';

// Validates a save. A restore of an old version runs through it too.
export const toCreateInput = (
  input: UpdateAboutPageInput
): Prisma.AboutPageCreateInput => {
  const rawLinks = assertMaxItems(input.links || [], 'links');
  const links = rawLinks.map((link, index) => ({
    name: assertMaxLength(link.name, LIMITS.shortText, `links[${index}].name`),
    url: normalizeUrl(link.url, `links[${index}].url`, LINK_PROTOCOLS),
  }));

  return {
    bio: assertMaxLength(input.bio || '', LIMITS.bio, 'bio'),
    title: assertMaxLength(input.title || '', LIMITS.shortText, 'title'),
    pictureURL: normalizeOptionalUrl(
      input.pictureURL || '',
      'pictureURL',
      HTTP_PROTOCOLS
    ),
    links: { create: links },
  };
};

export const resolver: Required<
  MutationResolvers<ContextInterface>
>['updateAboutPage'] = async (_parent, args, context, _info) => {
  await requireActiveAccount(context);

  const data = await update(toCreateInput(args.input));

  return {
    links: data?.links,
    version: data?.version,
    pictureURL: data?.pictureURL,
    bio: data?.bio,
    title: data?.title,
  };
};
