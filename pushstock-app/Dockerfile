# Create image based on the official Node 6 image from dockerhub
FROM node:6

# Create a directory where our app will be placed
RUN mkdir -p /usr/src/app/

# Change directory so that our commands run inside this new directory
WORKDIR /usr/src/app


# Get all the code needed to run the app
COPY . /usr/src/app
RUN ls -l

# Move into public directory
WORKDIR /usr/src/app/public
RUN pwd
RUN ls -l
# Install dependencies for public
RUN npm install
RUN ls -l
# Move into server directory
WORKDIR /usr/src/app/server
RUN pwd
RUN ls -l
# Install dependencies for server
RUN npm install
RUN ls -l
# Return to top level directory of project
WORKDIR /usr/src/app
RUN pwd
RUN ls -l


# Expose the port the app runs in
EXPOSE 4200

WORKDIR /usr/src/app/public
# Serve the app
CMD ["npm", "start"]

WORKDIR /usr/src/app/server
# Serve the app
CMD ["npm", "start"]

WORKDIR /usr/src/app
