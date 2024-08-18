const express = require('express');
const router = express.Router();
const controladorCrearObjetivo = require('../controllers/controladorCrearObjetivo');

// Ruta para acceder a la vista Crear objetivo
router.get('/crear-objetivo', controladorCrearObjetivo.obtenerCrearObjetivo);

// Ruta para procesar la creación del objetivo
router.post('/crear-objetivo', controladorCrearObjetivo.solicitarCrearObjetivo);

module.exports = router;
