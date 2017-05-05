const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const config = require('../config/main');
const Employee = require('../app/models/employee');


function generateToken(employee) {
    return jwt.sign(employee, config.secret, {
        expiresIn: 10080 // in seconds
    });
}

// Set user info from request
function setEmployeeInfo(request) {
    return {
        _id: request._id,
        firstName: request.profile.firstName,
        lastName: request.profile.lastName,
        email: request.email,
        role: request.role,
        password: request.password
    };
}



module.exports = {
    securedView: function(req, res) {
        res.json({ message: 'You must be an admin!' });
    },

    // Handle index view for auth urls
    indexView: function(req, res) {
        res.json({ message: 'Hooray! Welcome to authentication!' });
    },

    // Handle register view
    registrationView: function(req, res, next) {
        // Check for registration errors
        const email = req.body.email;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const password = req.body.password;

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

            newEmployee.save(function(err, employee) {
                if (err) { return next(err); }
                // Respond with JWT if user was created
                let employeeInfo = setEmployeeInfo(newEmployee);
                res.status(201).json({
                    token: 'JWT ' + generateToken(employeeInfo),
                    employee: employeeInfo
                });
            });
        });
    },

    // Handle login view
    loginView: function(req, res, next) {
        if(req.user){
            let employeeInfo = setEmployeeInfo(req.user);
            res.status(200).json({
                token: generateToken(employeeInfo),
                employee: employeeInfo
            });
        }
        else{
            res.status(401).json({
                message: 'User not found'
            });
        }
    },

    // Role authorization middleware
    roleAuthorization: function(role) {
        return function(req, res, next) {
            const employee = req.employee;

            Employee.findById(employee._id, function(err, foundEmployee) {
                if (err) {
                    res.status(422).json({ error: 'No user was found.' });
                    return next(err);
                }

                // If user is found, check role.
                if (foundEmployee.role == role) {
                    return next();
                }

                res.status(401).json({ error: 'You are not authorized to view this content.' });
                return next('Unauthorized');
            });
        }
    }

};
