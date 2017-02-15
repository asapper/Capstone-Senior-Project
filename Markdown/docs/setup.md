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


* Run the following command, swapping "username" with your username: psql -h 192.168.3.128 -p 32772 -d pushstock -U username

* You'll be prompted to enter your password. As said, this is the same as your username for the time-being.

* This should bring up a PostgreSQL command line; you should see "docker=#" (docker being the name of the database at the moment)

* To test that you are connected properly, in the psql command line, type: select * from buttons;
	* This should return a single test button that I have added

