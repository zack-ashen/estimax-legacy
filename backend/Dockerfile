#  Dockerfile for Node Express Backend

FROM node:20-alpine

# Create App Directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install Dependencies
COPY package*.json ./

RUN npm install --silent
RUN npm install typescript --silent

# Copy app source code
COPY . .

RUN npm run build

# Exports
EXPOSE 5000

CMD ["npm","start"]