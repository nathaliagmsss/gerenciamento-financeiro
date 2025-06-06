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

ADD https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-linux-amd64-v0.6.1.tar.gz /tmp/

RUN tar -C /usr/local/bin -xzvf /tmp/dockerize-linux-amd64-v0.6.1.tar.gz

RUN npm install --production

EXPOSE 3333

CMD dockerize -wait tcp://db:3306 -timeout 60s npx prisma migrate deploy && node dist/server.js