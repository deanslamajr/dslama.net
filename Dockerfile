FROM node:6.9.1

# install dependencies
WORKDIR /opt/app
COPY package.json package-lock.json* ./
COPY . /opt/app
RUN npm cache clean --force && npm install
RUN npm run build

# copy app to a base image with smaller filesize
# e.g. we don't need the build libraries (gcc) after running `npm install`
FROM node:6.9.1-alpine
COPY --from=0 /opt/app .

EXPOSE 8080
ENV PORT 8080
# ENV NODE_ENV PRODUCTION

CMD [ "npm", "run", "start" ]