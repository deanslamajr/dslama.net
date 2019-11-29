FROM node:6.9.0

# needed to compile bcrypt (as part of `npm install`)
# this takes awhile...
# is this still needed?
# if so, does a quicker alternative exist?
# e.g. https://hub.docker.com/r/eimhin/node/dockerfile 
RUN apt update         && \
  apt upgrade -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"  && \
  apt install -y -o Dpkg::Options::="--force-confdef" -o Dpkg::Options::="--force-confold"     \
    g++-4.8               && \
  apt-get clean

# install dependencies
WORKDIR /opt/app
COPY package.json package-lock.json* ./
COPY . /opt/app
RUN npm cache clean --force && npm install
RUN npm run build

# copy app source to image _after_ npm install so that
# application code changes don't bust the docker cache of npm install step

EXPOSE 8080
ENV PORT 8080
# ENV NODE_ENV PRODUCTION

CMD [ "npm", "run", "start" ]