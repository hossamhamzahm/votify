const express = require('express');
const passport = require('passport');
const router = express.Router({ mergeParams: true });
const usersController = require('../controllers/users');


router.get('/register', usersController.renderRegister);
router.get('/login', usersController.renderLogin);
router.get('/logout', usersController.logout);
router.post('/register', usersController.createUser);
router.post('/login', passport.authenticate('local', {
    successRedirect: '/polls',
    failureRedirect: '/login',
    failureFlash: true,
    successFlash: 'Welcome back!'
}), usersController.login);

module.exports = router;