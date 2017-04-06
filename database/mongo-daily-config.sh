#!/bin/bash

# Delete unused buttons
docker exec 201701pvs02_database_1 mongo -u pushstock-api -p Capstone_PVS022017API --authenticationDatabase pushstock-app pushstock-app delete_unused_buttons.js
