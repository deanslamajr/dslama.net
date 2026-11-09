/* eslint-disable @typescript-eslint/no-var-requires */
// next start would set this; the custom server must do the same before loading next.
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const http = require('http');
const next = require('next');

const port = parseInt(process.env.PORT || '8080', 10);
const DRAIN_DELAY_MS = 5000; // let the load balancer stop sending new requests
const FORCE_EXIT_MS = 20000; // below terminationGracePeriodSeconds (30)

const app = next({ dev: false });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = http.createServer((req, res) => handle(req, res));
  // The Google load balancer keeps backend connections for 600 seconds.
  server.keepAliveTimeout = 620 * 1000;
  server.headersTimeout = 621 * 1000;
  server.listen(port, () => console.log(`> Ready on http://localhost:${port}`));

  let shuttingDown = false;
  const shutdown = signal => {
    if (shuttingDown) return;
    shuttingDown = true;
    console.log(`${signal} received, draining`);
    setTimeout(() => {
      server.close(() => process.exit(0));
      setTimeout(() => process.exit(0), FORCE_EXIT_MS).unref();
    }, DRAIN_DELAY_MS);
  };
  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
});
