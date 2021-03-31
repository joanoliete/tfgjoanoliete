FROM node:13.12.0-alpine
WORKDIR /root
RUN npm i lerna -g

# Copy your packages
COPY packages/backend ./packages/backend
COPY packages/frontend ./packages/frontend

# Copies package.json and package-lock.json to Docker environment
COPY package.json package-lock.json lerna.json ./
RUN lerna bootstrap --hoist

# Copies everything over to Docker environment
COPY . ./
RUN npm run build

CMD ["npm", "run", "dev"]