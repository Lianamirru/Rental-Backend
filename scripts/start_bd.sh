#!/bin/bash

# Check if container exists
if docker ps -a --format '{{.Names}}' | grep -q '^mongodb$'; then
  echo "Container 'mongodb' found."

  # Check if container is running
  if [ "$(docker inspect -f '{{.State.Running}}' mongodb)" == "true" ]; then
    echo "'mongodb' container is already running."
  else
    echo "Starting 'mongodb' container..."
    docker start mongodb
  fi
else
  echo "Container 'mongodb' not found. Creating and starting a new one..."
  docker run -d --name mongodb -p 27017:27017 -v mongodb-data:/data/db mongo:latest
fi

# Show container logs (last 20 lines)
echo "Recent logs from 'mongodb':"
docker logs --tail 20 mongodb

# Optional: Open interactive mongosh inside container if running
if [ "$(docker inspect -f '{{.State.Running}}' mongodb)" == "true" ]; then
  echo "Opening mongosh shell inside 'mongodb' container..."
  docker exec -it mongodb mongosh
else
  echo "'mongodb' container is not running. Cannot open mongosh shell."
fi
# docker run -d   --name mongodb   -p 27017:27017   -v mongodb-data:/data/db   mongo:
# docker exec -it mongodb mongosh
# docker start mongodb 