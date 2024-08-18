const express = require('express');
const router = express.Router();
const controladorModificarObjetivo = require('../controllers/controladorModificarObjetivo');

// Ruta para renderizar la vista de modificación de Objetivos
router.get('/modificar-objetivo', controladorModificarObjetivo.obtenerModificarObjetivo);
router.get('/modificar-objetivo/obtener-habito/:id', controladorModificarObjetivo.solicitarHabitosObjetivo);

// Ruta para actualizar un hábito
router.post('/modificar-objetivo/:id/update', controladorModificarObjetivo.solicitarModificarObjetivo);

module.exports = router;