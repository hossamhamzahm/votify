const User = require('../modules/users');


module.exports.renderRegister = (req, res) => {
    res.render(`users/register`)
};

module.exports.renderLogin = (req, res) => {
    res.render(`users/login`)
};

module.exports.logout = (req, res) => {
    req.logout()
    req.flash('success', 'Logged out successfully')
    res.redirect(`/`)
};

module.exports.login = (req, res) => {
    const redirectUrl = req.session.returnTo || '/polls'
    res.redirect(redirectUrl)
};

module.exports.createUser = async (req, res, err) => {
    req.body.user.polls = [];
    req.body.user.num_of_polls = 0;
    const user = new User(req.body.user);
    const newUser = await User.register(user, req.body.password);
    req.login(newUser, (err)=>{
        if(err) next(err);
    });

    res.redirect(`/polls`);
};
