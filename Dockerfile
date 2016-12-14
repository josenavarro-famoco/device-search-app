FROM node:latest

EXPOSE 80

RUN apt-get update && apt-get install -y libpng12-0 nginx

RUN npm install -g yarn

COPY ./package.json ./yarn.lock /usr/src/app/

WORKDIR /usr/src/app

RUN yarn install

COPY ./ /usr/src/app

COPY .nginx.conf /etc/nginx/sites-enabled/default

RUN yarn build

ENTRYPOINT sh /usr/src/app/entrypoint.sh
