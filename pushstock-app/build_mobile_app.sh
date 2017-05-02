#!/bin/bash

### Script runs under the assumption of proper environment (i.e. has all dependencies) ###

# If mobile-app directory doesn't exist, make new Ionic project
# This *should* never execute
newproj=false
if [[ ! -d "mobile-app" ]]; then
    echo "Creating mobile app project..."
    ionic start --v2 --ts --appname "PushStock" mobile-app blank
    newproj=true
    echo "Created project"
fi

# Ensure that all intended platforms added
cd mobile-app
if [[ ! -d "platforms/ios" ]]; then
    echo "Adding ios platform..."
    ionic platform add ios
    echo "Added ios platform"
fi
if [[ ! -d "platforms/android" ]]; then
    echo "Adding android platform..."
    ionic platform add android
    echo "Added android platform"
fi

# Delete all old source files except theme/variables.scss and index.html
cd src
if [[ "$newproj" = true ]]; then
    exp="(theme)"
else
    exp="(theme|index\.html|app)"
fi
rm -rf `ls | grep -v -E "$exp"`

# Copy over all website source files
echo "Copying over source files from web directory..."
cp -Rn ../../public/src/ .

# Move main.ts to app/
#mv main.ts app/
# Delete Angular's main.ts; Ionic's is in app/
rm main.ts
echo "Copied source files from web"

# Run python script to change source files
#printf "Modifying source for mobile...\n"
#../../make_mobile_files.py

cd ..
echo "Installing dependencies..."
npm install
echo "Installed dependencies"
