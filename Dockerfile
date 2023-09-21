FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run prisma:client
RUN npm run build

# Serve Application using Nginx Server

FROM nginx:alpine

COPY --from=build /usr/src/app/dist/ng-santoral /usr/share/nginx/html

EXPOSE 80
