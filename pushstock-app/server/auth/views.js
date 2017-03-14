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
    };
}



module.exports = {
    securedView: function(req, res) {
        console.log("GET: /secured being accessed");
        res.json({ message: 'You must be an admin!' });
    },

    // Handle index view for auth urls
    indexView: function(req, res) {
        console.log("GET: /auth/ being accessed");
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
            if (err) { return next(err); }

            // If user is not unique, return error
            if (existingEmployee){
                return res.status(422).send({ error: 'That email address is already in use.' });
            }

            // If email is unique and password was provided, create account
            let employee = new Employee({
                email: email,
                password: password,
                profile: { firstName: firstName, lastName: lastName }
            });

            employee.save(function(err, employee) {
                if (err) { return next(err); }

                // Subscribe member to Mailchimp list
                // mailchimp.subscribeToNewsletter(user.email);

                // Respond with JWT if user was created
                let employeeInfo = setEmployeeInfo(employee);
                res.status(201).json({
                    token: 'JWT ' + generateToken(employeeInfo),
                    employee: employeeInfo
                });
            });
        });
    },

    // Handle login view
    loginView: function(req, res, next) {
        let employeeInfo = setEmployeeInfo(req.user);
        res.status(200).json({
            token: 'JWT ' + generateToken(employeeInfo),
            employee: employeeInfo
        });
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
