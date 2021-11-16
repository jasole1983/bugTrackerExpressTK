FROM node:14 AS ui-build

WORKDIR /usr/app/frontend
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN npm install
COPY frontend/public/. ./public/
COPY frontend/src/. ./src/
RUN npm build

WORKDIR /usr/app
COPY --from=ui-build ./frontend/build/. ./frontend/build

COPY package.json ./
COPY package-lock.json ./
RUN npm start
COPY ./bin/ ./bin
COPY ./config/ ./config
COPY ./db/ ./db
COPY ./routes/ ./routes
COPY ./utils/ ./utils
COPY app.js ./
COPY .sequelizerc ./
COPY .env ./

CMD ["npm", "start"]