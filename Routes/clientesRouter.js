const express = require('express');
const router = express.Router();

// Importar el controlador
const clientesController = require('../Controllers/clientesController.js');

// Ruta principal del dashboard
router ('/create', clientesController.create);


module.exports = router;