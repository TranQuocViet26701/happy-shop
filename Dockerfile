FROM node:16-alpine

WORKDIR /app

COPY . .

RUN yarn install

CMD [ "yarn", "dev" ]

EXPOSE 8080