# PVS02 Capstone Project

Documentation for Group 02, Baylor Capstone Project, Spring 2017.

Group members:

- Andy Sapper
- Brennan Saul
- Collin Rapp
- Ryan Ragnell

---

## Overview
For our Capstone project we were given a fictional problem that would resemble a real-life situation. We were given 15 weeks to implement a solution for such a problem (described below).

### Business Problem
"Commercially Facilites Management"

Commercially is a leading (fictional) commercial real estate services and investment firm. The core of their business revolves around leasing, servicing and maintaining commercial properties used for office space, retail, medical centers, malls, hotels, warehouses etc. Commercially prides itself on being able to meet its client's most demanding real estate challenges by leveraging their diverse set of global listings.

Commercially manages buildings with many tenants all over the world. A strenuous task with managing commercial properties is the management of supplies, i.e., paper towels, toilet paper, etc. When tenants run out of certain supplies, the process of scheduling someone to go replace said supply is time consuming. Commercially wants to automate this scheduling and provide maintenance employees with schedules to replace supplies.

## Our Solution
Our solution consists of a web application and a cross-platform mobile application that handles maintenance requests and schedules them to the maintenance workers.

### Technology Stack
For this project we used a MEAN stack, which is comprised of the following technologies:

- MongoDB
- ExpressJS
- Angular (with use of Ionic for mobile application)
- NodeJS

We used MongoDB as our database engine, ExpressJS as our API framework, Angular as our front-end framework, and NodeJS as the framework to build the application on. For our mobile application, we use the Ionic framework.

For our server we chose to use [**CentOS**](https://www.centos.org/), which is an open source software that suited our needs. We chose it because it is robust enough and also because it is widely trusted by the community of developers.

Inside our server we run our application with [**Docker**](https://www.docker.com/). With Docker we are able to abstract some configuration away from the server itself and handle it inside the Docker containers. This allowed us to freely make and test configuration changes without having to worry about causing costly configuration breakdowns. 

#### Reasoning For Technology Stack
We decided to use the MEAN stack for several reasons:

1. The MEAN stack is widely used and receives a lot of support from the community of developers.
2. The MEAN stack uses one language, Javascript, across all frameworks. Thus, it makes development very smooth and seamless among the frameworks.
3. MongoDB provided us with a lot of flexibility in terms of our database structure. This aspect was particularly relevant since we knew our database structure would most likely change often as we made changes to our product.
4. ExpressJS provided us with an API that required little setup and was very robust.
5. Angular provided us much flexibility on our front-end.

### Priorities
Our product focused primarily on three different aspects:

- Security and robustness
- Simple and intuitive interfaces
- Versatility

We wanted our product to be very robust in handling all of the internal and external operations: communications and operations between all of the components. We also wanted it to be simple to use: anyone should be able to use our product without needing to read a user manual. Lastly, we wanted it to provide the users a whole range of options with regards to how they handle the requests made.

---

In the next page you can find the design of the whole project.
