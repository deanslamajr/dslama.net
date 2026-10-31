#!/usr/bin/env node
// Refuse to reset any database that is not the local Docker Compose one.
require('dotenv').config();

const LOCAL_HOSTS = ['localhost', '127.0.0.1', '::1', '[::1]'];
// docker-compose.yml publishes Postgres on 5433. Port 5432 may hold another project's database.
const LOCAL_PORTS = ['5433'];

let parsed;
try {
  parsed = new URL(process.env.DATABASE_URL_LOCAL_USE_ONLY || '');
} catch (error) {
  console.error('The local database URL in .env is missing or invalid.');
  process.exit(1);
}
if (LOCAL_HOSTS.indexOf(parsed.hostname) === -1 || LOCAL_PORTS.indexOf(parsed.port) === -1) {
  console.error(
    `Refusing to run: DATABASE_URL_LOCAL_USE_ONLY points at ${parsed.hostname}:${parsed.port || '5432'}, not the local database on port 5433.`
  );
  process.exit(1);
}
console.log(`Local database ${parsed.hostname}:${parsed.port} confirmed.`);
