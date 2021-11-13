FROM node:14

WORKDIR /ybm/back

COPY package.json /ybm/back/
COPY package-lock.json /ybm/back/

RUN npm install

COPY . /ybm/back/

USER node

EXPOSE 3333

CMD [ "node", "app.js" ]


