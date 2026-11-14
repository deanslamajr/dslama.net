import { UserInputError } from 'apollo-server-micro';

import { MutationResolvers } from '../../../generated/graphql';
import { ContextInterface } from '../../context';
import { requireActiveAccount } from '../../auth';
import { pages, toSaveInput } from '../pageVersions';

export const resolver: Required<
  MutationResolvers<ContextInterface>
>['restorePageVersion'] = async (_parent, { page, version }, context) => {
  await requireActiveAccount(context);

  const stored = await pages[page].fetchVersion(version);
  if (!stored) {
    throw new UserInputError(`Version ${version} does not exist.`, {
      field: 'version',
    });
  }

  const created = await pages[page].restore(toSaveInput(stored));
  return { version: created.version, createdAt: created.createdAt };
};
