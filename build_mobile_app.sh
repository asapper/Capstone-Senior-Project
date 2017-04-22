#!/bin/bash

### Script runs under the assumption of proper environment (ie has all dependencies) ###

cd ./pushstock-app

# If mobile-app directory doesn't exist, make Ionic project
if [[ ! -d "mobile-app" ]]; then
    ionic start --v2 --ts --appname "PushStock" mobile-app blank
fi

cd mobile-app

if [[ ! -d "platforms/ios" ]]; then
    ionic platform add ios
fi

if [[ ! -d "platforms/android" ]]; then
    ionic platform add android
fi

cp -R ../public/src/ ./www/
