import { MutationResolvers } from '../../../generated/graphql';
import { ContextInterface } from '../../context';

export const resolver: Required<MutationResolvers<ContextInterface>>['logout'] = async (
  _parent,
  _args,
  context
) => {
  context.session.logout();
  return true;
};
