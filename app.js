const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const polls_router = require('./routes/polls');
const opts_router = require('./routes/opts');
const users_router = require('./routes/users');
const session = require('express-session')
const flash = require('connect-flash')
const passport =require('passport')
const localStrategy = require('passport-local')
const User = require('./modules/users')
const ExpressError = require('./utils/ExpressError');
const app = express();


const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/votify';


// connecting to mongo on votify
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
mongoose.connection.on('error', err => console.log("Error", err));
mongoose.connection.once('open', () => console.log("Connected to Mongo successfully"));



app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.json())

const sessionConfig = {
    // name: 'blah',
    // store: store,
    secret: process.env.SECRET || "this is a secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        // secure: true,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        maxAge: 1000 * 60 * 60 * 24 * 7,
    }
}
app.use(session(sessionConfig)); 
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next)=>{
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});


// Routers
app.use('/polls', polls_router);
app.use('/polls/:id/opts', opts_router);
app.use('/', users_router);
app.get('/', (req, res) => {
    res.render('home');
});
// Not found route
app.get('*', (req, res, next) => {
    next(new ExpressError("Error 404, Page Not Found", 404))
});

// errors middleware
app.use((err, req, res, next)=>{
    const {status = 500} = err
    res.status(status).render('error', {err})
})


const port = process.env.port || 3000;
app.listen(port, ()=>console.log(`Listening on port ${port}`));

