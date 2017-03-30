#!/bin/bash

# Create user admin
docker exec 201701pvs02_database_1 mongo admin create_mongo_admin.js
# Create other users
docker exec 201701pvs02_database_1 mongo -u root -p Capstone_PVS022017 --authenticationDatabase admin pushstock-app create_mongo_users.js
