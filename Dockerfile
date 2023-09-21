FROM node:18

ENV DATABASE_URL=NO_URL

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

# If you are building your code for production
# RUN npm ci --omit=dev

COPY ./prisma ./prisma
COPY ./config ./config
COPY ./api ./api

EXPOSE 3030

RUN npm run prisma:client
RUN npm run api:compile
# RUN npm run api:start

CMD [ "npm", "run", "api:start" ]
