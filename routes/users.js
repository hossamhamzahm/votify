const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });
const usersController = require('../controllers/users');


router.get('/register', usersController.renderRegister);
router.post('/register', usersController.createUser);

router.get('/logout', usersController.logout);

// Logging in
router.get('/login', usersController.renderLogin);
router.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: 'Welcome back!'
}), usersController.login);

module.exports = router;