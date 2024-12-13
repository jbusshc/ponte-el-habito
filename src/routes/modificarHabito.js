const express = require('express');
const router = express.Router();
const controladorModificarHabito = require('../controllers/controladorModificarHabito');

// Ruta para renderizar la vista de modificación de hábitos
router.get('/modificar-habito', controladorModificarHabito.obtenerModificarHabito);

// Ruta para actualizar un hábito
router.post('/modificar-habito/:id/update', controladorModificarHabito.solicitarModificarHabito);

router.get('/modificar-habito/:id/detalles', controladorModificarHabito.obtenerDetallesHabito);

module.exports = router;