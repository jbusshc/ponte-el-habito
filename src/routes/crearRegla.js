const express = require('express');
const router = express.Router();
const controladorCrearRegla = require('../controllers/controladorCrearRegla');

// Ruta para acceder a la vista Crear Regla
router.get('/crear-regla', controladorCrearRegla.obtenerCrearRegla);

// Ruta para procesar la creación del hábito
router.post('/crear-Regla', controladorCrearRegla.solicitarCrearRegla);

module.exports = router;
