# Etapa 1 - build da aplicação
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

# Etapa 2 - runtime da aplicação
FROM node:18

WORKDIR /app

COPY --from=build /app ./

RUN npm install --production

EXPOSE 3333

CMD ["node", "dist/server.js"]