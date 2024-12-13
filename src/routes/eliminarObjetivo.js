const express = require('express');
const router = express.Router();
const controladorEliminarObjetivo = require('../controllers/controladorEliminarObjetivo');

// Ruta para renderizar la vista de eliminación de hábitos
router.get('/eliminar-objetivo', controladorEliminarObjetivo.obtenerEliminarObjetivo);

// Ruta para eliminar un hábito específico
router.post('/eliminar-objetivo/:id', controladorEliminarObjetivo.solicitarEliminarObjetivo);

module.exports = router;