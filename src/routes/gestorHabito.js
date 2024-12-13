const express = require('express');
const router = express.Router();
const controladorGestorHabito = require('../controllers/controladorGestorHabito');

router.get('/gestor-habitos', controladorGestorHabito.obtenerGestorHabito);

module.exports = router;