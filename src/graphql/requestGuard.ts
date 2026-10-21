import { IncomingMessage, ServerResponse } from 'http';

// Same limit that micro applied before this guard existed.
const MAX_BODY_BYTES = 1024 * 1024;

type GuardedRequest = IncomingMessage & { filePayload?: unknown };
type Next = (error?: unknown) => void;

const reject = (res: ServerResponse, status: number, message: string) => {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ errors: [{ message }] }));
};

const readBody = (req: IncomingMessage): Promise<string | null> =>
  new Promise((resolve, rejectRead) => {
    let size = 0;
    const chunks: Buffer[] = [];
    req.on('data', (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        resolve(null);
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', rejectRead);
  });

// A cross-site form or a no-cors fetch can only send text/plain,
// application/x-www-form-urlencoded, or multipart/form-data.
// Requiring application/json blocks them. The client never batches.
export const graphqlRequestGuard = async (
  req: GuardedRequest,
  res: ServerResponse,
  next: Next
) => {
  if (req.method !== 'POST') {
    return next();
  }
  const contentType = (req.headers['content-type'] || '')
    .split(';')[0]
    .trim()
    .toLowerCase();
  if (contentType !== 'application/json') {
    return reject(res, 415, 'Content-Type must be application/json.');
  }
  const raw = await readBody(req);
  if (raw === null) {
    return reject(res, 413, 'Request body is too large.');
  }
  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch (error) {
    return reject(res, 400, 'Request body must be valid JSON.');
  }
  if (Array.isArray(body)) {
    return reject(res, 400, 'Batched requests are not supported.');
  }
  if (typeof body !== 'object' || body === null) {
    return reject(res, 400, 'Request body must be a JSON object.');
  }
  // apollo-server-micro reads req.filePayload before it parses the stream itself.
  req.filePayload = body;
  return next();
};
