#!/bin/bash

# Script schedules to run when Pi starts up.
# Ensures that passthrough daemon is always running.

if ! pgrep -f "/bin/bash ./passthrough_daemon.sh" > /dev/null
then
    ./passthrough_daemon.sh
fi
