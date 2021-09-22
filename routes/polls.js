const express = require('express');
const router = express.Router({mergeParams: true});
const pollsController = require('../controllers/polls');
const { isLogged } = require('../middleware');

router.get('/', isLogged, pollsController.showAllPolls);

router.get('/new', isLogged, pollsController.renderNew);

router.get('/:id', pollsController.show);


router.post('/', isLogged, pollsController.createPoll);


module.exports = router;