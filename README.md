# dslama.net

The personal site of Dean Slama Jr. It has four pages: about, posts, projects, and readings. It is a Next.js 9 app with React 16, TypeScript, and Grommet. A GraphQL API in the same app reads and writes a Postgres database through Prisma 3. Each page has a browser editor that anyone can open. Only a logged-in account can save.

## Local setup

You need Node 12.16.0 (see `.nvmrc`), nvm, and Docker.

1. Select the Node version: `nvm use`
2. Start Postgres 17 on `localhost:5433`: `docker compose up -d --wait postgres`
3. Create the env file: `cp .env.example .env`
4. In `.env`, set `SESSION_COOKIE_SECRET` to the output of `openssl rand -base64 32`. The app refuses to start with the example value.
5. Install the dependencies: `npm ci`
6. Create the tables: `npx prisma migrate deploy --schema ./prisma/migration.schema.prisma`
7. Generate the GraphQL types: `npm run codegen`
8. Create a login account (see "Accounts" below).

## Commands

| Task | Command |
|---|---|
| Dev server with codegen and typecheck in watch mode | `npm run dev` |
| Dev server with the Node inspector on port 9229 | `npm run dev:debug` |
| Generate GraphQL types and hooks | `npm run codegen` |
| Lint | `npm run lint` |
| Lint and fix | `npm run lint:fix` |
| Typecheck (run `npm run codegen` first) | `npm run typecheck` |
| Unit and component tests | `npm test` |
| Integration tests against the local Postgres | `npm run test:integration` |
| Production build | `npm run build` |
| Serve the production build on port 8080 | `npm start` |
| Prisma Studio on port 5555 | `npm run studio` |
| Drop the local database and replay all migrations | `npm run migrate` |

`npm run test:integration` creates the database `dslama_test` on `localhost:5433`, applies the migrations, and empties its tables before each test. It does not touch the `dslama` database. It refuses any other host, any other port, and any database name that does not end in `_test`. The `TEST_DB_*` variables in `test/database.js` change the target.

`npm run migrate` deletes all data. If `DATABASE_URL_LOCAL_USE_ONLY` does not point at the local database on port 5433, it refuses to run.

## Edit mode

1. Open a page, for example `/` or `/posts`. Add `?edit` to the URL, for example `/posts?edit`, to show the logout button after you log in.
2. Click the site title in the navbar, or focus it with Tab and press Enter. The page editor opens.
3. Change the content and click Save. If you are not logged in, the login form appears. Log in, then save again.
4. In `?edit` mode, click logout to end the session.

To import many items at once, set `window.__inputFromConsole = { posts: [...], projects: [...], readings: [...] }` in the browser console before you open the editor. Dates are epoch milliseconds. The editor fills the list with the items that have the right shape.

## Accounts

There is no signup flow. Create an account, or reset its password, with the script. It prompts for the username and hides the password, which must have at least 12 characters.

```sh
DATABASE_URL=postgresql://dslama:dslama-local-only@localhost:5433/dslama node scripts/create-account.js
DATABASE_URL=postgresql://dslama:dslama-local-only@localhost:5433/dslama node scripts/create-account.js --reset-password
```

A password reset ends every session of that account. To end the sessions without a reset, run this SQL:

```sql
UPDATE "Account" SET "sessionVersion" = "sessionVersion" + 1 WHERE username = '<username>';
```

## Schema changes

Two schema files hold the same models. `prisma/schema.prisma` has an empty database URL, because the app builds the URL at runtime. `prisma/migration.schema.prisma` reads `DATABASE_URL_LOCAL_USE_ONLY`.

1. Change both files the same way.
2. Create and apply the migration: `npx prisma migrate dev --name <descriptive-name> --schema ./prisma/migration.schema.prisma`
3. Update the Prisma client: `npx prisma generate`

Never put a remote database URL in `.env`. To migrate production, follow the operator procedure (port-forward and an inline `DATABASE_URL_LOCAL_USE_ONLY`).

## Deploy

1. If the schema changed, migrate the production database first.
2. Run `npm run publish:patch` (or `publish:minor`, `publish:major`). It runs the build, bumps the version with a commit and a tag, and pushes the image tagged with `git describe`.
3. Push the commit and the tag: `git push origin master "$(git describe)"`
4. Point the Kubernetes manifest in the deployment repository at the new tag and apply it.
