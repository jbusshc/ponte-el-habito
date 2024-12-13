const express = require('express');
const router = express.Router();
const controladorModificarRegla = require('../controllers/controladorModificarRegla');

// Ruta para renderizar la vista de modificación de reglas
router.get('/modificar-regla', controladorModificarRegla.obtenerModificarRegla);
router.get('/modificar-regla/obtener-habito/:id', controladorModificarRegla.solicitarHabitosRegla);
router.get('/modificar-regla/:id/detalles', controladorModificarRegla.obtenerDetallesRegla);

// Ruta para actualizar un hábito
router.post('/modificar-regla/:id/update', controladorModificarRegla.solicitarModificarRegla);

module.exports = router;