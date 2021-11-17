FROM node:14 AS frontend

ENTRYPOINT [ "mkdir", "dockerBuild/frontend" ]

ADD ./frontend/package.json ./dockerBuild/frontend
ADD ./frontend/package-lock.json ./dockerBuild/frontend

WORKDIR /dockerBuild/frontend
RUN "npm" "install"

WORKDIR /

ADD ./frontend/public ./dockerBuild/frontend/public
ADD ./frontend/src ./dockerBuild/frontend/src

RUN "npm" "run" "build"

COPY --from=frontend ./frontend/build ./dockerBuild/frontend/build

ADD ./package.json ./dockerBuild/package.json
ADD ./package-lock.json ./dockerBuild/package-lock.json

RUN "npm" "install"

ADD ./bin ./dockerBuild/bin
ADD ./config ./dockerBuild/config
ADD ./db ./dockerBuild/db
ADD ./routes ./dockerBuild/routes
ADD ./utils ./dockerBuild/utils
ADD ./app.js ./dockerBuild/app.js
ADD .sequelizerc /dockerBuild

CMD [ "node", "app.js" ]

