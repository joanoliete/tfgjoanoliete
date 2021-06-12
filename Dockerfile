FROM node:13.12.0-alpine
WORKDIR /root
RUN npm i lerna -g

# Copy your packages
COPY packages/backend ./packages/backend
COPY packages/frontend ./packages/frontend

# Copies package.json and package-lock.json to Docker environment
COPY package.json package-lock.json lerna.json ./
RUN lerna bootstrap --hoist

# Copies everything over to Docker environment tests and builds
COPY . ./
RUN npm run build

EXPOSE 3000 3001

CMD ["npm", "run", "start"]
