import { NextApiRequest, NextApiResponse } from 'next';

// Liveness and load balancer check. It never touches the database, so a
// database outage does not restart the container.
export default (req: NextApiRequest, res: NextApiResponse): void => {
  res.setHeader('Cache-Control', 'no-store');
  res.status(200).json({ status: 'ok' });
};
