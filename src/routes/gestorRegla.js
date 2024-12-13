const express = require('express');
const router = express.Router();
const controladorGestorRegla = require('../controllers/controladorGestorRegla');

router.get('/gestor-regla', controladorGestorRegla.obtenerGestorRegla);

router.get('/gestor-regla/habitos/:id', controladorGestorRegla.obtenerHabitosPorRegla);

module.exports = router;