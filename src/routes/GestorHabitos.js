const express = require('express');
const router = express.Router();
const controladorGestorHabitos = require('../controllers/controladorGestorHabitos');

// Ruta para acceder a la vista Crear Habito
router.get('/gestor-habitos', controladorGestorHabitos.obtenerGestorHabitos);

module.exports = router;