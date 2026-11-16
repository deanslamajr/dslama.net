import { QueryResolvers } from '../../../generated/graphql';
import { ContextInterface } from '../../context';
import { requireActiveAccount } from '../../auth';
import { hasErrorCode } from '../../errors';

export const resolver: Required<
  QueryResolvers<ContextInterface>
>['viewer'] = async (_parent, _args, context) => {
  try {
    const account = await requireActiveAccount(context);
    return { id: account.id, username: account.username };
  } catch (error) {
    if (hasErrorCode(error, 'UNAUTHENTICATED')) {
      return null;
    }
    throw error;
  }
};
