FROM node:slim

RUN npm init --yes

RUN npm install

CMD ["node src/main.js"]