FROM node:16
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
# Install 'serve' globally
RUN npm install -g serve
EXPOSE 3001
CMD ["npx", "serve", "build", "-l", "3001"]
