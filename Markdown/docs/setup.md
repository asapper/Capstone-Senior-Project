##Setting Up The Deveploment Environment
Following are the instructions to setup a development environment and get the software running.

---

# Developing on your local machine

To get started on our dev, you'll pull from our Git repo in TFS. (You probably already did that considering you're reading this). Once you've pulled, go into the pushstock-app directory. When testing/running the app while developing, you'll need Docker on your machine. Go to [Docker's website](https://docs.docker.com/engine/installation/) and follow the installation instructions.

Once you have installed Docker, run it as indicated in the instructions found in the link above. Once Docker is up and running, run the following command in terminal while inside of the push-stock app directory:

    docker-compose up --build

This will take a little bit of time the first time you run it, as it's building the images of the express-server, angular-client, and MongoDB. It then runs the containers necessary. You'll know the "composing" is done when you see the message: "API running in localhost port 4200".

**NOTE:** after you run the last command, you might see a lot of red statements printed to the console, this is expected as it's only downloading the necessary packages.

Once Docker is done composing you can head over to https://localhost:4200 and see the application running. Hooray! We have our development environment ready.

You might notice that there's is not much you can do now. In order to create some base accounts in the database exit out of Docker by clicking `Ctrl-C`. Then, run the following command, still in the pushstock-app directory:

    ./startup-script.sh

This script will automatically create accounts in the database that you can use. Head over to the User Guide page to find more information on those accounts.

# Setting up mobile app dev environment

**Note:** You may have to use `sudo` in order to make some or possibly all of these commands work.

In order to build the mobile app, you need to have installed:

* Angular 2
* npm
* bower
* Ionic
* Cordova

After installing the first two, the latter three can be installed with:  
`npm install -g bower ionic cordova`

### iOS

In order to build the iOS version of the app, you must be running macOS/OS X with XCode installed from the App Store. Once XCode is installed, you must install some command line tools with the command `xcode-select --install`.

If you want to launch the iOS app in a simulator, you must install ios-sim by running:  
`npm install -g ios-sim`  
If you want to launch the iOS app on a device, you must install ios-deploy by running:  
`npm install -g ios-deploy`

### Android

In order to build the Android version of the app, you must install various Java and Android utilities. First, [install the latest version of the Java Development Kit (JDK)](http://www.oracle.com/technetwork/java/javase/downloads/index.html). If you are running Windows, you will then need to [set the JAVA_HOME environment variable](https://cordova.apache.org/docs/en/latest/guide/platforms/android/#setting-environment-variables).

Next, [install Android Studio](https://developer.android.com/studio/install.html?pkg=tools) to get the Anrdoid SDK tools. The necessary packages are:

* Android SDK Tools
* Android SDK Platform-tools
* Android SDK Build-tools
* Android 7.1.1 (API 25)
    * SDK Platform
    * Sources for Android SDK
* Extras
    * Android Support Repository
    * Google Repository

Further help can be found [here](https://developer.android.com/studio/intro/update.html).

You must then install the necessary System Images by running   
`/Users/<username>/Library/Android/sdk/tools/android sdk`.  
Next, create a virtual device by running   
`/Users/<username>/Library/Android/sdk/tools/android avd`.  
This will open a GUI for creating a device. Choose any.

## Building the mobile app

To build the latest version of the mobile app based on the website, navigate to the project root directory and run `./build_mobile_app.sh`.

## Running the mobile app
### On a computer

Ensure that the environment is set up as described above.

Running a simulation of the app in a web browser is as simple as navigating to the mobile app project directory and running `ionic serve`. To compare all mobile platforms, append `--lab` to the command.  
To launch the app in an iOS simulator, run `ionic emulate ios`.  
To launch the app in an Android simulator, run `ionic emulate android`.

### On a mobile device

Ensure that the device is properly attached, and can be detected by the system.  

To run the app on an iOS device, run `ionic run ios`.  
To run the app on an Android device, run `ionic run android`.

# Information for Twilio

Account: Collin Rapp  
Phone Number: +1 (971) 252-6887
