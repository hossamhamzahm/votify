const express = require('express');
const router = express.Router({mergeParams: true});
// const pollsController = require('../controllers/polls');

router.get('/', (req, res) => {
    res.send("showing all polls");
});

router.get('/new', (req, res) => {
    res.render('polls/new');
});


router.post('/', (req, res)=>{res.send(req.body.poll)});
// router.post('/', pollsController.createPoll);

module.exports = router;