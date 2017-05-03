const express = require('express');
const auth_router = express.Router();

const AuthenticationController = require('../controllers/authentication');
const passportService = require('../config/passport');
const passport = require('passport');

const views = require('./views');

// Middleware to require login/auth
const requireAuth = passport.authenticate('jwt', { session: false });

const requireLogin = passport.authenticate('local', { session: false });


// Constants for role types
const REQUIRE_ADMIN = "Admin",
      REQUIRE_WORKER = "Worker",
      REQUIRE_PI = "Pi";


// Main route (ex: /auth/)
auth_router.get('/', views.indexView);
// Registration route (ex: /auth/register/)
auth_router.post('/register', AuthenticationController.register);
// Login route (ex: /auth/login/)
auth_router.post('/login', requireLogin, AuthenticationController.login);

auth_router.get('/secured', requireAuth, AuthenticationController.roleAuthorization(REQUIRE_ADMIN), views.securedView);

module.exports = auth_router;