import bcrypt from 'bcryptjs';

import { LoginResult, Resolver, MutationResolvers } from '../../../generated/graphql';
import { ContextInterface } from '../../context';

import {
  fetch as fetchAccount,
  update as updateAccount
} from '../postgresql/account';

export const resolver: Required<MutationResolvers<ContextInterface>>['attemptLogin'] = async (
  _parent, args, context, _info
) => {
  const { input } = args;
  let wasSuccessful = false;

  const account = await fetchAccount({username: input.username})

  if (account) {
    const isCorrectPassword = await bcrypt.compare(
      input.password,
      account.password
    );

    const isUserActive = account.isActive;

    if (isCorrectPassword && isUserActive) {
      await updateAccount({
        id: account.id,
        lastLoginAt: new Date()
      });

      wasSuccessful = true;
      context.session.setAccountId(account.id);
    }
  }

  return {
    wasSuccessful,
  };
};
