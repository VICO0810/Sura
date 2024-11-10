const express = require('express');
const router = express.Router();

const usuariosController = require('../controllers/usuariosController');

router.get('/', usuariosController.index);
router.get('/create', usuariosController.create);
router.post('/create', usuariosController.store);
router.get('/edit/:id', usuariosController.edit);
router.post('/edit/:id', usuariosController.update);
module.exports = router;