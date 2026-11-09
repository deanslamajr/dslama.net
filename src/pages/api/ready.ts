import { NextApiRequest, NextApiResponse } from 'next';

import { pingDatabase } from '../../graphql/schema/resolvers/postgresql/health';

const TIMEOUT_MS = 2000;

// Readiness check. The pod gets traffic only while the database answers.
export default async (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> => {
  res.setHeader('Cache-Control', 'no-store');

  let timer: NodeJS.Timeout | undefined;
  const timeout = new Promise((resolve, reject) => {
    timer = setTimeout(
      () => reject(new Error('Database ping timed out')),
      TIMEOUT_MS
    );
  });

  try {
    await Promise.race([pingDatabase(), timeout]);
    res.status(200).json({ status: 'ok' });
  } catch (error) {
    res.status(503).json({ status: 'unavailable' });
  } finally {
    if (timer) {
      clearTimeout(timer);
    }
  }
};
