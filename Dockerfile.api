FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY ./prisma ./prisma
COPY ./config ./config
COPY ./api ./api

EXPOSE 443

RUN npm run prisma:client
RUN npm run api:compile

COPY ./api/src/certs/*.pem ./api/lib/certs/

CMD [ "npm", "run", "api:start" ]
