/* eslint-disable @typescript-eslint/no-var-requires */
// next start would set this; the custom server must do the same before loading next.
process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const http = require('http');
const next = require('next');

const port = parseInt(process.env.PORT || '8080', 10);
const DRAIN_DELAY_MS = 5000; // let the load balancer stop sending new requests
const FORCE_EXIT_MS = 20000; // below terminationGracePeriodSeconds (30)
const STATIC_PAGES = ['/', '/posts', '/projects', '/readings'];
const WARMUP_ATTEMPTS = 20;
const WARMUP_INTERVAL_MS = 1500; // longer than the 1 second revalidate of a built page

const app = next({ dev: false });
const handle = app.getRequestHandler();

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const getPage = path =>
  new Promise((resolve, reject) => {
    http
      .get({ host: '127.0.0.1', port, path }, res => {
        let body = '';
        res.setEncoding('utf8');
        res.on('data', chunk => (body += chunk));
        res.on('end', () => resolve(body));
      })
      .on('error', reject);
  });

// The image build writes each page without data, because it has no database.
// A request to a stale page returns it and then renders it again with data.
// Request each page until the response holds data, so visitors get real pages.
const warmPage = async path => {
  for (let attempt = 0; attempt < WARMUP_ATTEMPTS; attempt += 1) {
    try {
      const html = await getPage(path);
      if (!html.includes('"initialApolloState":null')) return;
    } catch (error) {
      // the next attempt tries again
    }
    await sleep(WARMUP_INTERVAL_MS);
  }
  console.warn(`${path} still has no data after warmup`);
};

let isWarm = false;

app.prepare().then(() => {
  // The readiness probe fails until warmup ends, so the pod gets no traffic before.
  const server = http.createServer((req, res) => {
    if (!isWarm && req.url === '/api/ready') {
      res.writeHead(503, { 'Cache-Control': 'no-store' });
      res.end(JSON.stringify({ status: 'warming' }));
      return;
    }
    handle(req, res);
  });
  // The Google load balancer keeps backend connections for 600 seconds.
  server.keepAliveTimeout = 620 * 1000;
  server.headersTimeout = 621 * 1000;
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
    Promise.all(STATIC_PAGES.map(warmPage)).then(() => {
      isWarm = true;
    });
  });

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
