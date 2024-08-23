const express = require('express');
const router = express.Router();
const controladorModificarObjetivo = require('../controllers/controladorModificarObjetivo');

// Ruta para renderizar la vista de modificación de objetivos
router.get('/modificar-objetivo', controladorModificarObjetivo.obtenerModificarObjetivo);
router.get('/modificar-objetivo/:id/detalles', controladorModificarObjetivo.obtenerDetallesObjetivo);

// Ruta para actualizar un objetivo
router.post('/modificar-objetivo/:id/update', controladorModificarObjetivo.solicitarModificarObjetivo);



module.exports = router;
