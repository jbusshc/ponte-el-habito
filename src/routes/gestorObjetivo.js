const express = require('express');
const router = express.Router();
const controladorGestorObjetivo = require('../controllers/controladorGestorObjetivo');

router.get('/gestor-objetivo', controladorGestorObjetivo.obtenerGestorObjetivo);

module.exports = router;