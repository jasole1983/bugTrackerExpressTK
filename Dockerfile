FROM node:14 AS ui-build

WORKDIR /client/
COPY package.json ./
COPY package-lock.json ./
RUN npm install
COPY src/ ./src
COPY public/ ./public
RUN npm run build

FROM node:14 AS server-build

WORKDIR /
COPY --from=ui-build /usr/app/client/build/ ./client/build/
WORKDIR /server/

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY server/ ./

ENV NODE_ENV=production
ENV DATABASE_URL=postgresql://bug_tracker_app:8U67r4Ck3RpW0rD@yerbugginme.herokuapp.com:5432/bug_tracker

EXPOSE 5000

CMD [ "node", "app.js" ]