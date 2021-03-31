FROM node:13.12.0-alpine
WORKDIR /root
RUN npm i lerna -g
COPY . /
RUN lerna bootstrap
RUN npm run build

CMD ["npm", "run", "dev"]