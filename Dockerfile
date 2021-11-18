FROM node:14.0-alpine

RUN mkdir dockerBuild
WORKDIR /dockerBuild

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

EXPOSE 5000

CMD [ node app.js ]

