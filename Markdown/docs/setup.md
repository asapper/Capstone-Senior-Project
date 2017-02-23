#Setting Up Our Dev Environment

We need to use Node/Express with Angular2, while using Sequelize, and ORM tool to access SQL databases including PostgreSQL. 

## Current links/tutorials under examination:
https://medium.com/defmethod-works/building-an-express-node-js-app-with-angular-2-and-the-twitter-api-4eebd06fecff#.ivhd6bnr6

https://www.udemy.com/complete-typescript-2-course/

* This one is very important as it includes information about deploying with Docker. The only difference is that we will need to look at using Sequelize instead of Mongo.

https://scotch.io/tutorials/create-a-mean-app-with-angular-2-and-docker-compose

## Setting up database access
### A PostgreSQL database is now up and running on our server. Here is how to connect to it (*when in the Capstone lab*)

* Install PostgreSQL
	* If using a Mac: Copy the following and paste it into your terminal and run it: /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	Now run the following: brew install postgresql

	* If using Windows: Go to [PostgreSQL](https://www.postgresql.org/download/windows/) and download the installer.


* Now, we can connect to the database. I have created user's for everyone to connect with the password the same as the username (this can be changed later).
	* Andy's username: andy
	* Brennan's username: brennan
	* Collin's username: collin
	* Ryan's username: ryan


* Run the following command, swapping "username" with your username: psql -h 192.168.3.128 -p 32774 -d pushstock -U username

* You'll be prompted to enter your password. As said, this is the same as your username for the time-being.

* This should bring up a PostgreSQL command line; you should see "pushstock=#" (pushstock being the name of the database at the moment)

* To test that you are connected properly, in the psql command line, type: select * from buttons;
	* This should return a single test button that I have added


## Developing on your local machine
### The latest push to the repo includes most of what we need to really get down to developing.

To get started on our dev, you'll pull from our Git repo in TFS. (You probably already did that considering you're reading this). Once you've pulled, go into the pushstock-app directory. When testing/running the app while developing, you'll need Docker on your machine. Go to Docker's website and follow the instructions.

Once Docker is up and running, type the following in terminal while inside of the push-stock app directory: docker-compose up --build

This will take a little bit of time the first time you run it, as it's building the images of the express-server, angular-client (not much going on with that at the moment), and MongoDB (just for now, easily switchable to Sequelize/Postgres). It then runs all 3 of these images in their own containers, but they're containers that share a network, so it can all communicate. Pretty cool, eh?

Now, you can test without the Pi or the button! Go to localhost:3000/api and you should see a message. Use Postman (download it) and send a POST to localhost:3000/api/singleClick and you should receive a message back that says "Single click acknowledged!".

Hooray! We have our basic dev environment. Now, we can add to the angular-client directory or the express-server directory all of our dev, and then rebuild with the same docker-compose statement above. This will look at all the images/files, see what needs to be updated, and only rebuild those things.

- Ryan
