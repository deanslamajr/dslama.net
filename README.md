# dslama.net

An about page web app

# Development
* `nvm use`
* A connection to a properly migrated DB is required to run this app
    * A docker-compose is provided to simplify setting up a locally hosted postgresql server
        * Ensure that [Docker Compose](https://docs.docker.com/compose/install/) is available on the command line
        * `sudo docker-compose up`
* Set environment variables
    * `cp ./.env.example ./.env`
    * set values for the variables in `.env`
* `npm run clean:dev`
## To Debug Backend
* `npm run dev:debug`
* In vscode, run `Attach` script in the debug menu

# DB tasks
## modify schema
    * make changes to `./prisma/schema.prisma`
    * apply these changes to the DB - `npx prisma migrate dev --name <descriptive-name-for-changes>`
    * apply the changes to the client/types - `npx prisma generate`
## manage data (view, modify, etc.)
    * `npx prisma studio`
    * open browser to `http://localhost:5555/`
## to migrate a remote schema
  * `git checkout` the commit with the changes
  * set `DATABASE_URL` in `.env` for the remote DB
  * `npx prisma migrate deploy`
## combine all migrations into a single migration
  * delete `/prisma/migrations`
  * `npx prisma migrate dev --name init`
  * *Warning: all DB data will be cleared*
    * select option `y` when prompted

# Deployments
* If there are changes to the DB schema, follow the "to migrate a remote schema" section above
* `npm run build` - Verify build before creating image
* `npm publish:<version-bump-method>`