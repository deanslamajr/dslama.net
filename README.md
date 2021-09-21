# dslama.net

An about page web app

# Development
* `nvm use`
* `npm run clean`
* A connection to a properly migrated DB is required to run this app
    * A docker-compose is provided to simplify setting up a locally hosted postgresql server
        * Ensure that [Docker Compose](https://docs.docker.com/compose/install/) is available on the command line
        * `sudo docker-compose up`
* Set environment variables
    * `cp ./.env.example ./.env`
    * set values for the variables in `.env`
* `npm run dev`

## DB
* to migrate a remote schema
  * set `DATABASE_URL` in `.env` for the remote DB
  * `npx prisma migrate deploy`
* manage data (view, modify, etc.)
    * `npx prisma studio`
    * open browser to `http://localhost:5555/`
* modify schema
    * make changes to `./prisma/schema.prisma`
    * updates the DB - `npx prisma migrate dev --name <descriptive-name-for-changes>`
    * updates the client/types - `npx prisma generate`
* combine all migrations into a single migration
  * delete `/prisma/migrations`
  * `npx prisma migrate dev --name init`
  * *Warning: all DB data will be cleared*
    * select option `y` when prompted
    

## To Debug Backend
* `npm run dev:debug`
* In vscode, run `Attach` script in the debug menu