const User = require('../modules/users');
const {send} = require('../utils/mail_sender');
const randomString = require('random-string');



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


module.exports.createUser = async (req, res, err) => {
    req.body.user.polls = [];
    req.body.user.num_of_polls = 0;
    req.body.user.is_verified = false;
    req.body.user.verification_str = randomString({
        length: 128,
        numeric: true,
        letters: true,
        special: false,
    });

    const user = new User(req.body.user);
    const newUser = await User.register(user, req.body.password);
    console.log("before sending the email")

    const verification_link = `${req.protocol}://${req.hostname}/users/${req.body.user.verification_str}`
    await send(user.email, user.f_name, verification_link)
    console.log("create user before login")
    req.login(newUser, (err)=>{
        if(err) next(err);
        console.log("create user in login middleware")
    });
    console.log("create user after login")
    req.flash('success', 'Verification email has been sent to you, please go to your email to verify your account.')
    res.redirect(`/`);
};




module.exports.verifyAccount = async (req, res, err) => {
    const user = await User.findOne({verification_str: req.params.verification_str});
    if(!user){
        req.flash('error', 'Invalid verification link');
        res.redirect('/register');
    }
    user.is_verified = true;
    await user.save();
    req.flash('success', 'Account verified successfully');
    res.redirect(`/`);
};