#!/bin/bash

docker-compose up --build database &
docker-compose build web
./database/mongo-init-config.sh
docker-compose up web
