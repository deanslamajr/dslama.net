import { AuthenticationError } from 'apollo-server-micro';
import { QueryResolvers } from '../../../generated/graphql';
import { ContextInterface } from '../../context';
import { requireActiveAccount } from '../../auth';

export const resolver: Required<QueryResolvers<ContextInterface>>['viewer'] = async (_parent, _args, context) => {
  try {
    const account = await requireActiveAccount(context);
    return { id: account.id, username: account.username };
  } catch (error) {
    if (error instanceof AuthenticationError) {
      return null;
    }
    throw error;
  }
};
