import { IncomingMessage, ServerResponse } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import cookieSession from 'cookie-session';
import nextConnect from 'next-connect';
import getConfig from 'next/config';

const {
  serverRuntimeConfig: { SESSION_COOKIE_SECRET, NODE_ENV },
} = getConfig();

const isProduction = NODE_ENV === 'production';
export const SESSION_MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

export type IncomingMessageWithSession = IncomingMessage & {
  session: SessionInterface;
};

export type ContextInterface = {
  session: {
    setAccountId: (id: string) => void;
    getAccountId: () => string | undefined;
    logout: () => void;
  };
};

type SessionInterface = {
  accountId?: string;
};

type ResolveContextParams = {
  req: IncomingMessage;
  res: ServerResponse;
};

const initializedSession: SessionInterface = {
  accountId: undefined,
};

export const resolveContext = (incomingContext: {
  req: IncomingMessageWithSession;
}): ContextInterface => {
  return {
    session: {
      setAccountId: (id: string) =>
        (incomingContext.req.session.accountId = id),
      getAccountId: () =>
        incomingContext.req.session && incomingContext.req.session.accountId,
      logout: () => (incomingContext.req.session = { ...initializedSession }),
    },
  };
};

const cookieSessionMiddleware = cookieSession({
  name: 'session',
  secret: SESSION_COOKIE_SECRET,
  maxAge: SESSION_MAX_AGE_MS,
  httpOnly: true,
  sameSite: 'lax',
  secure: isProduction,
});

type CookieSessionArgs = Parameters<typeof cookieSessionMiddleware>;

// TLS ends at the Google load balancer, so the pod receives plain HTTP.
// cookies@0.8 refuses to write a Secure cookie unless req.protocol is "https",
// and cookie-session swallows that error, so login would silently fail.
// Mark the request as HTTPS from configuration, not from request headers.
export const sessionMiddleware = (
  req: IncomingMessage,
  res: ServerResponse,
  next: (error?: unknown) => void
) => {
  if (isProduction) {
    (req as IncomingMessage & { protocol?: string }).protocol = 'https';
  }
  return cookieSessionMiddleware(
    (req as unknown) as CookieSessionArgs[0],
    (res as unknown) as CookieSessionArgs[1],
    next as CookieSessionArgs[2]
  );
};

export const resolveContextDuringNextSSR = async ({
  req,
  res,
}: ResolveContextParams): Promise<ContextInterface> => {
  const handler = nextConnect<NextApiRequest, NextApiResponse>();
  handler.use(sessionMiddleware);
  await handler.run(req as NextApiRequest, res as NextApiResponse);
  return resolveContext({
    req: req as IncomingMessageWithSession,
  });
};
