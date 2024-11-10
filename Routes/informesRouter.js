const express = require('express');
const router = express.Router();

const informesController = require('../Controllers/informesController');

router.get('/', informesController.informes);

module.exports = router;