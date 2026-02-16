FROM node:20 AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci --legacy-peer-deps

COPY . .

RUN npm run build


FROM node:20 AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production --legacy-peer-deps

COPY --from=build /app/dist ./dist

EXPOSE 4000

ENV NODE_ENV=production

CMD ["npm", "run", "serve:ssr"]
