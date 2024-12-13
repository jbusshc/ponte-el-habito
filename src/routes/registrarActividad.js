const express = require('express');
const router = express.Router();
const controladorRegistrarActividad = require('../controllers/controladorRegistrarActividad');

// Ruta para renderizar la vista de registro de actividad
router.get('/registrar-actividad', controladorRegistrarActividad.obtenerRegistrarActividad);

// Ruta para registrar una nueva actividad
router.post('/registrar-actividad', controladorRegistrarActividad.registrarActividad);

module.exports = router;
