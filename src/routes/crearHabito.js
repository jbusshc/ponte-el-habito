const express = require('express');
const router = express.Router();
const controladorCrearHabito = require('../controllers/controladorCrearHabito');

// Ruta para acceder a la vista Crear Habito
router.get('/crear-habitos', controladorCrearHabito.obtenerCrearHabito);

// Ruta para procesar la creación del hábito
router.post('/crear-habitos', controladorCrearHabito.solicitarCrearHabito);

module.exports = router;
