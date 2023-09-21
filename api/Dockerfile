FROM node:18

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm ci

COPY ./prisma ./prisma
COPY ./config ./config
COPY ./api ./api

EXPOSE 3030

RUN npm run prisma:client
RUN npm run api:compile

CMD [ "npm", "run", "api:start" ]
