const express = require('express');
const router = express.Router();
const controladorHistorialProductividad = require('../controllers/controladorHistorialProductividad');

// Ruta para acceder al historial de productividad
router.get('/historial-productividad', controladorHistorialProductividad.obtenerHistorialProductividad);

// Ruta para obtener la productividad 
router.get('/historial-productividad/:idr', controladorHistorialProductividad.obtenerActividadPorProductividad);

module.exports = router;
