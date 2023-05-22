FROM mongo:latest
COPY ./preload.js /docker-entrypoint-initdb.d/