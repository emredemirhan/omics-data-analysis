#!/bin/sh

# Wait for MongoDB to be ready
echo "Waiting for MongoDB to be ready..."
while ! nc -z mongodb 27017; do
  sleep 1
done
echo "MongoDB is ready!"

# Run the seed script - it will handle checking if data exists
echo "Running seed script..."
npm run seed

# Start the application
echo "Starting the application..."
exec npm start