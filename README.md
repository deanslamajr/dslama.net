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
## migrate a remote database
Never put a remote database URL in `.env`. To migrate production, follow the operator procedure (port-forward and an inline `DATABASE_URL_LOCAL_USE_ONLY`).

# Deployments
* If there are changes to the DB schema, migrate the remote database first (see above)
* `npm run build` - Make sure that the build passes before you create the image
* `npm publish:<version-bump-method>`