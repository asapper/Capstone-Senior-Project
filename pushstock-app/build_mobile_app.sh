#!/bin/bash

# Filename:     build_mobile_app.sh
# Author:       Collin Rapp
# Description:  Copies necessary files from website, installs mobile dependencies, and
#               builds mobile app

### Script runs under the assumption of proper environment (i.e. has all dependencies) ###

# If mobile-app directory doesn't exist, make new Ionic project
# This *should* never execute
newproj=false
if [[ ! -d "mobile-app" ]]; then
    echo "Creating new mobile app project..."
    echo "WARNING: WILL REQUIRE CHANGES TO SOURCE CODE TO WORK PROPERLY"
    ionic start --v2 --ts --appname "PushStock" mobile-app blank
    newproj=true
    echo "Created new project"
fi

# Delete all old source files except theme/variables.scss and index.html
cd mobile-app/src
if [[ "$newproj" = true ]]; then
    rm -rf `ls | grep -v -E "theme"`
else
    rm -rf `ls | grep -v -E "(theme|index\.html|app)"`
    cd app
    rm -rf `ls | grep -v -E "(main\.ts|app\.module\.ts)"`
    cd ..
    #rm -rf `ls | grep -v -E "(main\.ts|app\.module\.ts|services)"`
    #cd services
    #rm -rf `ls | grep -v -E "api-settings.ts"`
    #cd ../..
fi

# Copy over all website source files
echo "Copying over source files from web directory..."
cp -Rn ../../public/src/ .

# Delete Angular's main.ts; Ionic's is in app/
rm main.ts
echo "Copied source files from web"

cd ..

echo "Installing dependencies..."
npm install
echo "Installed dependencies"

# Add iOS platform if necessary, and then build either way
if [[ ! -d "platforms/ios" ]]; then
    echo "Adding ios platform..."
    ionic platform add ios
    echo "Added ios platform"
fi

# Add Android platform if necessary, and then build either way
if [[ ! -d "platforms/android" ]]; then
    echo "Adding Android platform..."
    ionic platform add android
    echo "Added Android platform"
fi

# Build app to make sure everything in place
echo "Building core Ionic project..."
ionic build 2> build_errors.txt
errors=`grep -ic "err" build_errors.txt`
if [[ "$errors" -eq "0" ]]; then
    echo "Built core Ionic project"
    rm build_errors.txt
else
    cat build_errors.txt
    rm build_errors.txt
    echo "Failed to build core Ionic project"
    exit 1
fi

if [[ -e "build_errors.txt" ]]; then
    rm build_errors.txt
fi

# Allow mobile app to access HTTPS server
cd platforms/ios/PushStock/Classes/
printf "\n\n@implementation NSURLRequest(DataController)\n+ (BOOL)allowsAnyHTTPSCertificateForHost: (NSString *)host\n{\n\treturn YES;\n}\n@end" >> AppDelegate.m
