const User = require('./modules/users');
const Poll = require('./modules/polls');




module.exports.isLogged = async (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl;
        req.flash('error', 'You must be signed in');
        return res.redirect('/login');
    }
    next();
};

module.exports.isPollAuthor = async (req, res, next) => {
    const poll = await Poll.findById(req.params.id);
    if (toString(poll.author) !== toString(req.user._id)) {
        req.flash('error', "You don't have permission to do that!");
        return res.redirect(`/polls/${poll.id}`);
    }
    next();
};