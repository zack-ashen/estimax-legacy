#  Dockerfile for Node Express Backend

FROM node:20-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install -g node-pre-gyp --silent
RUN npm install --silent

# Copy app source code
COPY . ./

RUN npm run build

# Exports
EXPOSE 5000

CMD [ "node", "dist/server.js" ]
