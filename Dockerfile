FROM node:16.20-alpine as builder
RUN apk update && apk add python3-dev make alpine-sdk gcc g++ git build-base openssh openssl bash

WORKDIR /server/qp
COPY ./package.json .
COPY ./package-lock.json .
RUN npm ci
COPY . .

ENTRYPOINT ["npm" , "start"]