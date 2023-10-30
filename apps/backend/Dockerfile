FROM docker.io/node:lts-alpine

ENV HOST=0.0.0.0
ENV PORT=443
# ENV DATABASE_URL=URL

WORKDIR /app

COPY dist/apps/backend backend

COPY package*.json ./

RUN npm ci
COPY ./prisma ./prisma

# Recover secret DATABASE_URL (from Github Action) needed for Prisma
RUN --mount=type=secret,id=DATABASE_URL npm run prisma:client

# You can remove this install step if you build with `--bundle` option.
# The bundled output will include external dependencies.
# RUN npm --prefix backend --omit=dev -f install

EXPOSE 443

CMD [ "node", "backend/main.js" ]
