const express = require('express');
const router = express.Router();
// Cada ruta necesita su controlador respectivo
const controladorLanding = require('../controllers/controladorLanding');

// Ruta para la página de inicio
router.get('/', controladorLanding.obtenerLanding);

module.exports = router;
