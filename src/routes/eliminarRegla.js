const express = require('express');
const router = express.Router();
const controladorEliminarRegla = require('../controllers/controladorEliminarRegla');

// Ruta para renderizar la vista de eliminación de reglas
router.get('/eliminar-regla', controladorEliminarRegla.obtenerEliminarRegla);

// Ruta para eliminar una regla específica
router.post('/eliminar-regla/:id', controladorEliminarRegla.solicitarEliminarRegla);

module.exports = router;