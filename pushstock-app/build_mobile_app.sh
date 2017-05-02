#!/bin/bash

### Script runs under the assumption of proper environment (i.e. has all dependencies) ###

# If mobile-app directory doesn't exist, make new Ionic project
# This *should* never execute
newproj=false
if [[ ! -d "mobile-app" ]]; then
    echo "Creating new mobile app project..."
    ionic start --v2 --ts --appname "PushStock" mobile-app blank
    newproj=true
    echo "Created new project"
fi

# Delete all old source files except theme/variables.scss and index.html
cd mobile-app/src
if [[ "$newproj" = true ]]; then
    #exp="(theme)"
    rm -rf `ls | grep -v -E "theme"`
else
    #exp="(theme|index\.html|app)"
    rm -rf `ls | grep -v -E "(theme|index\.html|app)"`
    cd app
    rm -rf `ls | grep -v -E "(main\.ts|app\.module\.ts)"`
    cd ..
fi
#rm -rf `ls | grep -v -E "$exp"`

# Copy over all website source files
echo "Copying over source files from web directory..."
cp -Rn ../../public/src/ .

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

# Build app to make sure everything in place
echo "Building core Ionic project..."
ionic build
echo "Built core Ionic project"

# Add any platforms if necessary, and build them either way
if [[ ! -d "platforms/ios" ]]; then
    echo "Adding ios platform..."
    ionic platform add ios
    echo "Added ios platform"
fi
echo "Building iOS project..."
ionic build ios
echo "Built iOS project"

if [[ ! -d "platforms/android" ]]; then
    echo "Adding Android platform..."
    ionic platform add android
    echo "Added Android platform"
fi
echo "Building Android project..."
ionic build android
echo "Built Android project"
