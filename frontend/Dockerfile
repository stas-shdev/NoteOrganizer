FROM node:20.20.0 as build
WORKDIR /frontend
COPY client/package.json ./
RUN npm install

COPY client/ ./
RUN npm run build

FROM nginx:alpine
COPY --from=build /frontend/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD [ "nginx","-g","daemon off;" ]