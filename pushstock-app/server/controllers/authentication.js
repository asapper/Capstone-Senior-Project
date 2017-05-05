"use strict"
const jwt = require('jsonwebtoken'),  
      crypto = require('crypto'),
      Employee = require('../app/models/employee'),
      config = require('../config/main');

function generateToken(employee) {  
  return jwt.sign(employee, config.secret, {
    expiresIn: 36000 // in seconds
  });
}

// Set user info from request
function setEmployeeInfo(request) {  
  return {
    _id: request._id,
    email: request.email,
    role: request.role
  };
}

//========================================
// Login Route
//========================================
exports.login = function(req, res, next) {
  if(req.user){
      let employeeInfo = setEmployeeInfo(req.user);
      let tokenString = generateToken(employeeInfo);
      console.log(tokenString);
      res.status(200).json({
          token: tokenString,
          employee: employeeInfo
      });
  }
  else{
      res.status(401).json({
          message: 'User not found'
      });
  }
}


//========================================
// Registration Route
//========================================
exports.register = function(req, res, next) {  
  // Check for registration errors
  const email = req.body.email;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const password = req.body.password;
  const role = req.body.role;
  
  if(!role){
    role = 'Unassigned';
  }

  // Return error if no email provided
  if (!email) {
    return res.status(422).send({ error: 'You must enter an email address.'});
  }

  // Return error if full name not provided
  if ((firstName && !lastName) || (!firstName && lastName)) {
    return res.status(422).send({ error: 'You must enter your full name.'});
  }

  // Return error if no password provided
  if (!password) {
    return res.status(422).send({ error: 'You must enter a password.' });
  }


  Employee.findOne({ email: email }, function(err, existingEmployee) {
      if (err) { 
          console.log("Find one error: " + err);
          return next(err); 
      }


      // If user is not unique, return error
      if (existingEmployee){
        return res.status(422).send({ error: 'That email address is already in use.' });
      }

      var newEmployee = new Employee();
      newEmployee.email = email;
      newEmployee.password = password;
      newEmployee.profile = { firstName, lastName }
      newEmployee.role = role;

      newEmployee.save(function(err, newEmployee) {
        if (err) { 
          console.log("Employee save error: " + err);
          return next(err); 
        }

        // Respond with JWT if user was created

        let employeeInfo = setEmployeeInfo(newEmployee);

        res.status(201).json({
          token: 'JWT ' + generateToken(employeeInfo),
          newEmployee: employeeInfo
        });
      });
  });
}


//========================================
// Authorization Middleware
//========================================

// Role authorization check
exports.roleAuthorization = function(requiredRole) {  
  return function(req, res, next) {
    const user = req.user;

    Employee.findById(user._id, function(err, foundEmployee) {
      if (err) {
        res.status(422).json({ error: 'No user was found.' });
        return next(err);
      }

      // If user is found, check role.
      if (requiredRole.indexOf(foundEmployee.role) > -1) {
        return next();
      }

      res.status(401).json({ error: 'You are not authorized to view this content.' });
      return next('Unauthorized');
    });
  };
}






