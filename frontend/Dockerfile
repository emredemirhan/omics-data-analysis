FROM node:18-alpine

WORKDIR /app

# Copy package.json and package-lock.json first for better caching
COPY package*.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

# Make sure the public directory exists
RUN mkdir -p /app/public

EXPOSE 3000

CMD ["npm", "start"] 