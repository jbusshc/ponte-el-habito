const express = require('express');
const router = express.Router();
const controladorModificarHabitos = require('../controllers/controladorModificarHabitos');

// Ruta para renderizar la vista de modificación de hábitos
router.get('/modificar-habito', controladorModificarHabitos.renderizarModificarHabitos);

module.exports = router;
