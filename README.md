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
* manage data (view, modify, etc.)
    * `npx prisma studio`
    * open browser to `http://localhost:5555/`
* modify schema
    * make changes to `./prisma/schema.prisma`
    * updates the DB - `npx prisma migrate dev --name <descriptive-name-for-changes>`
    * updates the client/types - `npx prisma generate`

## To Debug Backend
* `npm run dev:debug`
* In vscode, run `Attach` script in the debug menu