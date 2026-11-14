import { QueryResolvers } from '../../../generated/graphql';
import { ContextInterface } from '../../context';
import { pages, VERSION_LIST_LIMIT } from '../pageVersions';

// Version numbers and dates only, so it needs no login.
export const resolver: Required<
  QueryResolvers<ContextInterface>
>['pageVersions'] = (_parent, { page }) =>
  pages[page].listVersions(VERSION_LIST_LIMIT);
