FROM node:14.15.4-alpine

WORKDIR /usr/src/app

ENV LANG C.UTF-8
ENV TZ Asia/Tokyo

# package.jsonとyarn.lockを/usr/src/appにコピー
COPY ["package.json", "yarn.lock", "./"]

RUN apk add --update nodejs nodejs-npm

# パッケージをインストール
RUN yarn install

COPY . /usr/src/app

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "build" ]