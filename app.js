const express = require('express');
const ejsMate = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const polls_router = require('./routes/polls');
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


app.use('/polls', polls_router);
app.get('/', (req, res) => {
    res.render('home');
});
app.get('*', (req, res) => {
    res.send("Error 404, page not found");
});

const port = process.env.port || 3300;
app.listen(port, ()=>console.log(`Listening on port ${port}`));

