# Create image based on the official Node 6 image from dockerhub
FROM node:6

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app/

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app

# Get all the code needed to run the app
COPY . /usr/src/app

# Move into public directory
WORKDIR /usr/src/app/public
# Install dependencies for public
RUN npm install
RUN ./node_modules/angular-cli/bin/ng build
# Move into server directory
WORKDIR /usr/src/app/server
# Install dependencies for server
RUN npm install
# Return to top level directory of project
WORKDIR /usr/src/app

# Add API environment variables
ENV PUSHSTOCK_API_USERNAME="pushstock-api"
ENV PUSHSTOCK_API_PASSWORD="Capstone_PVS022017API"

# Expose the port the app runs in
EXPOSE 4200
EXPOSE 80

WORKDIR /usr/src/app
