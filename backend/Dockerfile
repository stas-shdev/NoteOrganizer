FROM node:alpine
WORKDIR /backend
COPY server/package*.json ./
RUN npm install

COPY ./server ./server
EXPOSE 5000
CMD ["node","server/index.js"]