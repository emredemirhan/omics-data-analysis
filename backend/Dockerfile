FROM node:18-alpine

WORKDIR /app

# Install netcat for checking MongoDB connection
RUN apk add --no-cache netcat-openbsd

COPY package*.json ./

RUN npm install

COPY . .

# Make the entrypoint script executable
RUN chmod +x /app/docker-entrypoint.sh

EXPOSE 3001

CMD ["/app/docker-entrypoint.sh"]