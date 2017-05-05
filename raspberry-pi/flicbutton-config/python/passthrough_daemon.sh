#!/bin/bash

# Start up script.
# Starts all the scripts needed to scan new buttons,
#  listen to button events, and communicate those events over
#  to the server.

RPI_DB_DIR="/home/pi/flicbutton-config/armv6l"
RPI_CL_DIR="/home/pi/flicbutton-config/python"

$RPI_DB_DIR/flicd -f $RPI_DB_DIR/flic.sqlite3 &
$RPI_CL_DIR/my_client.py &
while $RPI_CL_DIR/my_scan_wizard.py
do
    if ! pgrep -f "python3 $RPI_CL_DIR/my_client.py" > /dev/null
    then
        $RPI_CL_DIR/my_client.py &
        true
    fi
done
