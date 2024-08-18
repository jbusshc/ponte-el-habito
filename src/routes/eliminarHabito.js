const express = require('express');
const router = express.Router();
const controladorEliminarHabito = require('../controllers/controladorEliminarHabito');

// Ruta para renderizar la vista de eliminación de hábitos
router.get('/eliminar-habito', controladorEliminarHabito.obtenerEliminarHabito);

// Ruta para eliminar un hábito específico
router.post('/eliminar-habito/:id', controladorEliminarHabito.solicitarEliminarHabito);

module.exports = router;