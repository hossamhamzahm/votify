const express = require('express');
const router = express.Router({mergeParams: true});
const pollsController = require('../controllers/polls');
const { isLogged, isPollAuthor } = require('../middleware');

// showing polls routes
router.get('/', isLogged, pollsController.showAllPolls);
router.get('/:id', pollsController.show);

// Creating new polls
router.get('/new', isLogged, pollsController.renderNew);
router.post('/', isLogged, pollsController.createPoll);

// Editing polls
router.get('/:id/edit', isLogged, isPollAuthor, pollsController.renderEdit);
router.put('/:id', isLogged, isPollAuthor, pollsController.editPoll);

// removing polls
router.delete('/:id', isLogged, isPollAuthor, pollsController.deletePoll);


module.exports = router;