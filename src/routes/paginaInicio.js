const express = require('express');
const router = express.Router();
// Cada ruta necesita su controlador respectivo
const controladorPrincipal = require('../controllers/controladorPrincipal');

// Ruta para la página de inicio
router.get('/', controladorPrincipal.obtenerPaginaInicio);

module.exports = router;
