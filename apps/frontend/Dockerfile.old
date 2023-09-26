FROM node:18 AS build

# Get the arguments from the command line
# ARG NGX_API_URL

# Set the environment variables
# ENV NGX_API_URL=$NGX_API_URL
ENV NG_APP_AUTH0_DOMAIN=dev-rdurf54b.eu.auth0.com
ENV NG_APP_AUTH0_CLIENT_ID=sYSWiNxCFI2GdzfKZJrXjjh06GI7zdZj
ENV NG_APP_API_BASE_URL=/api/v1
# ENV NG_APP_API_BASE_URL=https://192.168.1.119:5443


WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

# COPY tsconfig*.json ./
# COPY angular.json ./
# COPY ./.angular ./.angular
# COPY ./prisma ./prisma
# COPY ./src ./src
COPY . .

RUN npm run prisma:client
RUN npm run build

# Serve Application using Nginx Server

FROM nginx:alpine

COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /usr/src/app/dist/ng-santoral /usr/share/nginx/html

EXPOSE 80
