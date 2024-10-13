const express = require('express');
const router = express.Router();

// Ruta principal del dashboard
router.get('/', (req, res) => {
    res.render('dashboard');
});
module.exports = router;