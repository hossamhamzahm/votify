const express = require('express');
const router = express.Router({ mergeParams: true });
const optsController = require('../controllers/opts');
const { isLogged, isPollAuthor } = require('../middleware');


router.post('/', isLogged, optsController.newOpt);
router.put('/', isLogged, optsController.editOpts);
router.delete('/:optId', isLogged, isPollAuthor, optsController.removeOpt);

module.exports = router;