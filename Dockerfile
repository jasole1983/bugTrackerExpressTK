FROM node:14.0-alpine

RUN mkdir dockerBuild
WORKDIR /dockerBuild

RUN mkdir frontend 
WORKDIR /dockerBuild/frontend

COPY /frontend/package.json /
COPY /frontend/package-lock.json /

RUN npm install

WORKDIR /

COPY /frontend/public /dockerBuild/frontend/public
COPY /frontend/src /dockerBuild/frontend/src

WORKDIR /dockerBuild/frontend

RUN npm build

COPY /package.json /dockerBuild/package.json
COPY /package-lock.json /dockerBuild/package-lock.json

WORKDIR /dockerBuild

RUN npm install

COPY /bin /dockerBuild/bin
COPY /config /dockerBuild/config
COPY /db /dockerBuild/db
COPY /routes /dockerBuild/routes
COPY /utils /dockerBuild/utils
COPY /app.js /dockerBuild/app.js
COPY .sequelizerc /dockerBuild/.sequelizerc

CMD [ node app.js ]

