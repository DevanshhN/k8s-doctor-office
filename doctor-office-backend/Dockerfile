FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install && npm install cors
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]