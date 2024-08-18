const express = require('express');
const router = express.Router();
const controladorGestorRegla = require('../controllers/controladorGestorRegla');

router.get('/gestor-regla', controladorGestorRegla.obtenerGestorRegla);

module.exports = router;