const express = require('express');
const router = express.Router({ mergeParams: true });
const optsController = require('../controllers/opts');
const { isLogged } = require('../middleware');


router.put('/', isLogged, optsController.editOpts);

module.exports = router;