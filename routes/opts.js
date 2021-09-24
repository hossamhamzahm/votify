const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync')
const optsController = require('../controllers/opts');
const { isLogged, isPollAuthor } = require('../utils/middleware');


router.post('/', isLogged, catchAsync(optsController.newOpt));
router.put('/', isLogged, catchAsync(optsController.editOpts));
router.delete('/:optId', isLogged, catchAsync(isPollAuthor), catchAsync(optsController.removeOpt));

module.exports = router;