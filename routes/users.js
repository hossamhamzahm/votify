const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });
const usersController = require('../controllers/users');
const catchAsync = require('../utils/catchAsync')

router.get('/register', usersController.renderRegister);
router.post('/register', catchAsync(usersController.createUser));

router.get('/logout', usersController.logout);

// Logging in
router.get('/login', usersController.renderLogin);
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: 'Welcome back!'
}), catchAsync(usersController.login));

// account verification link
router.get('/users/:verification_str', usersController.verifyAccount);

module.exports = router;