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
router.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if(err) return next(err);

        if (!user) { 
            req.flash('failure', 'You must be signed in')
            return res.redirect('/login'); 
        }

        req.logIn(user, function (err) {
            if (err) return next(err);
            req.flash('success', 'Welcome back!')
            return res.redirect(req.session.returnTo || '/polls');
        });
    })(req, res, next);
});


// account verification link
router.get('/users/:verification_str', usersController.verifyAccount);

module.exports = router;