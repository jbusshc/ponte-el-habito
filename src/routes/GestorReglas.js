const express = require('express');
const router = express.Router();
const controladorGestorReglas = require('../controllers/controladorGestorReglas');

// Ruta para acceder a la vista Gestor Reglas
router.get('/gestor-reglas', controladorGestorReglas.obtenerGestorReglas);

module.exports = router;
