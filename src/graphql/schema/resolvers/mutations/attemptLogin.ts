import { randomBytes } from 'crypto';
import bcrypt from 'bcryptjs';
import { ApolloError } from 'apollo-server-micro';

import { MutationResolvers } from '../../../generated/graphql';
import { ContextInterface } from '../../context';
import { loginLimiter } from '../../rateLimit';
import { logger } from '../../../../logger';

import {
  fetch as fetchAccount,
  update as updateAccount,
} from '../postgresql/account';

// Same cost as the stored hash, so a missing account takes as long as a wrong password.
const DUMMY_HASH = bcrypt.hashSync(randomBytes(16).toString('hex'), 10);
const FAILURE_DELAY_MS = 500;
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const resolver: Required<
  MutationResolvers<ContextInterface>
>['attemptLogin'] = async (_parent, { input }, context) => {
  const keys = { ip: context.clientIp, username: input.username.toLowerCase() };
  if (loginLimiter.isLimited(keys)) {
    // The client IP is logged on login failures by owner decision.
    logger.warn({ clientIp: context.clientIp }, 'login rate limit reached');
    throw new ApolloError(
      'Too many login attempts. Try again later.',
      'RATE_LIMITED'
    );
  }
  const account = await fetchAccount({ username: input.username });
  const isCorrectPassword = await bcrypt.compare(
    input.password,
    account ? account.password : DUMMY_HASH
  );
  if (account && isCorrectPassword && account.isActive) {
    loginLimiter.reset(keys);
    await updateAccount({ id: account.id, lastLoginAt: new Date() });
    context.session.start(account);
    return { wasSuccessful: true };
  }
  loginLimiter.recordFailure(keys);
  logger.info({ clientIp: context.clientIp }, 'login failed');
  await sleep(FAILURE_DELAY_MS);
  return { wasSuccessful: false };
};
