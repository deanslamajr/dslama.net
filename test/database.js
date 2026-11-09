// The integration tests write to this database and empty it before each test.
// The defaults match docker-compose.yml. The database name must end in "_test".
const parts = {
  DB_USER: process.env.TEST_DB_USER || 'dslama',
  DB_PASS: process.env.TEST_DB_PASS || 'dslama-local-only',
  DB_HOST: process.env.TEST_DB_HOST || 'localhost:5433',
  DB_NAME: process.env.TEST_DB_NAME || 'dslama_test',
};

const encode = value => encodeURIComponent(value);
const url = `postgresql://${encode(parts.DB_USER)}:${encode(parts.DB_PASS)}@${
  parts.DB_HOST
}/${encode(parts.DB_NAME)}`;

const assertTestDatabase = () => {
  const { hostname, port } = new URL(url);
  if (
    ['localhost', '127.0.0.1'].indexOf(hostname) === -1 ||
    port !== '5433' ||
    !/_test$/.test(parts.DB_NAME)
  ) {
    throw new Error(
      `Refusing to run integration tests against ${hostname}:${port}/${parts.DB_NAME}. Use a local database on port 5433 whose name ends in "_test".`
    );
  }
};

module.exports = { parts, url, assertTestDatabase };
