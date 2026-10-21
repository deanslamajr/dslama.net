import { AuthenticationError } from 'apollo-server-micro';
import { Account } from '@prisma/client';
import { ContextInterface, SESSION_MAX_AGE_MS } from './context';
import { fetchById } from './resolvers/postgresql/account';

const unauthenticated = () =>
  new AuthenticationError('This action requires an authenticated account.');

// cookie-session keeps no server-side state, so the expiry, the account state,
// and the revocation counter are all checked here on every write.
export const requireActiveAccount = async (context: ContextInterface): Promise<Account> => {
  const session = context.session.get();
  if (
    !session ||
    typeof session.accountId !== 'string' ||
    typeof session.sessionVersion !== 'number' ||
    typeof session.issuedAt !== 'number' ||
    Date.now() - session.issuedAt > SESSION_MAX_AGE_MS
  ) {
    throw unauthenticated();
  }
  const account = await fetchById(session.accountId);
  if (!account || !account.isActive || account.sessionVersion !== session.sessionVersion) {
    throw unauthenticated();
  }
  return account;
};
