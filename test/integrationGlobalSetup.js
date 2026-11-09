const { execSync } = require('child_process');
const { url, assertTestDatabase } = require('./database');

module.exports = () => {
  assertTestDatabase();
  execSync(
    'npx prisma migrate deploy --schema ./prisma/migration.schema.prisma',
    {
      env: { ...process.env, DATABASE_URL_LOCAL_USE_ONLY: url },
      stdio: 'inherit',
    }
  );
};
