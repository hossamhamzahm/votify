const express = require('express');
const router = express.Router({mergeParams: true});
const pollsController = require('../controllers/polls');

router.get('/', pollsController.showAllPolls);

router.get('/new', (req, res) => {
    res.render('polls/new');
});

router.get('/:id', pollsController.show);


router.post('/', pollsController.createPoll);


module.exports = router;