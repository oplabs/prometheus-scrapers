FROM node:18-alpine

WORKDIR /app

COPY package.json ./
COPY src ./src

RUN npm install

EXPOSE 4000

CMD [ "node", "src/index.js" ]
