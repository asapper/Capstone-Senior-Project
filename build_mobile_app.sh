#!/bin/bash

direxists=`ls ./pushstock-app | grep -c -E "^mobile-app$"`
if [[ "$direxists" -eq "0" ]] then
    ionic start --v2 --ts --appname "PushStock" mobile-app
fi

cd mobile-app

# TODO check for ios and android first
# Script is being run in bash shell so assume it's on macOS w/ XCode
ionic platform add ios android

#cp -R
