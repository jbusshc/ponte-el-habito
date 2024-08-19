const express = require('express');
const router = express.Router();
const controladorHistorialHabito = require('../controllers/controladorHistorialHabito');

// Ruta para acceder al historial de hábitos
router.get('/historial-habito', controladorHistorialHabito.obtenerHistorialHabito);

// Ruta para obtener las actividades de un hábito específico
router.get('/historial-habito/:idh', controladorHistorialHabito.obtenerActividadPorHabito);

module.exports = router;
