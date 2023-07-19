#  Dockerfile for Node Express Backend

FROM node:bullseye

# Create App Directory
WORKDIR /usr/src/app

# Install Dependencies
COPY package.json ./

RUN npm install -g node-pre-gyp nodemon ts-node --silent
RUN npm install --silent

# Copy app source code
COPY . .

# Exports
EXPOSE 5000

CMD [ "npm", "run", "dev" ]