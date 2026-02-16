FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install --legacy-peer-deps

COPY . .

RUN npm run build:ssr

FROM node:20 AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --omit=dev --legacy-peer-deps

COPY --from=build /app/dist ./dist

ENV NODE_ENV=production

CMD ["node", "dist/why-not-both/server/server.mjs"]
