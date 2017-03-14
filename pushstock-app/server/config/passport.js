// Importing Passport, strategies, and config
const passport = require('passport'),
      Employee = require('../app/models/employee'),
      config = require('./main'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };

// Setting up local login strategy
const localLogin = new LocalStrategy(localOptions, function(email, password, done) {
  Employee.findOne({ email: email }, function(err, employee) {
    if(err) { return done(err); }
    if(!employee) { return done(null, false, { error: 'Your email could not be found in our system. Please try again.' }); }

  	employee.comparePassword(password, function(err, isMatch) {
  		if (err) { return done(err); }
  		if (!isMatch) { return done(null, false, { error: "Your login details could not be verified. Please try again." }); }

  	return done(null, employee);
  	});
  });
});

const jwtOptions = {
  // Telling Passport to check authorization headers for JWT
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  // Telling Passport where to find the secret
  secretOrKey: config.secret
};

// Setting up JWT login strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done) {
  Employee.findById(payload._id, function(err, employee) {
    if (err) { return done(err, false); }

    if (employee) {
      done(null, employee);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);  
