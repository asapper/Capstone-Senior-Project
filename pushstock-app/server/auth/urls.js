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
      REQUIRE_OWNER = "Owner",
      REQUIRE_CLIENT = "Client",
      REQUIRE_MEMBER = "Member";


// Main route (ex: /auth/)
auth_router.get('/', views.indexView);
// Registration route (ex: /auth/register/)
auth_router.post('/register', views.registrationView);
// Login route (ex: /auth/login/)
auth_router.post('/login', requireLogin, views.loginView);

module.exports = auth_router;
