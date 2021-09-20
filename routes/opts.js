const express = require('express');
const router = express.Router({ mergeParams: true });
const optsController = require('../controllers/opts');


router.put('/', optsController.editOpts);

module.exports = router;