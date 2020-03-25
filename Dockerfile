FROM node:10.15.3

ENV NODE VERSION 10.15.3

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

RUN npm start

COPY . .

EXPOSE 5000

CMD npm start --host 0.0.0.0 --port 5000 