const express = require('express');
const router = express.Router({mergeParams: true});
const pollsController = require('../controllers/polls');
const catchAsync = require('../utils/catchAsync')
const { isLogged, isPollAuthor } = require('../utils/middleware');

router.get('/', isLogged, pollsController.showAllPolls);
router.get('/new', isLogged, pollsController.renderNew);
router.get('/:id', catchAsync(pollsController.show));

router.post('/', isLogged, catchAsync(pollsController.createPoll));

// Editing polls
router.get('/:id/edit', isLogged, catchAsync(isPollAuthor), catchAsync(pollsController.renderEdit));
router.put('/:id', isLogged, catchAsync(isPollAuthor), catchAsync(pollsController.editPoll));

// removing polls
router.delete('/:id', isLogged, catchAsync(isPollAuthor), catchAsync(pollsController.deletePoll));


module.exports = router;