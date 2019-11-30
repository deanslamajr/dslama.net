FROM node:6.9.0

# install dependencies
WORKDIR /opt/app
COPY package.json package-lock.json* ./
COPY . /opt/app
RUN npm cache clean --force && npm install
RUN npm run build

# copy app source to image _after_ npm install so that
# application code changes don't bust the docker cache of npm install step
FROM mhart/alpine-node:4.9
COPY --from=0 /opt/app .

EXPOSE 8080
ENV PORT 8080
# ENV NODE_ENV PRODUCTION

CMD [ "npm", "run", "start" ]