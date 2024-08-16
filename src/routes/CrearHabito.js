const express = require('express');
const router = express.Router();
const controladorCrearHabito = require('../controllers/controladorCrearHabito');  // Asegúrate de que esta ruta sea correcta

// Ruta para acceder a la vista Crear Habito
router.get('/crear-habitos', controladorCrearHabito.obtenerCrearHabitos);  // Verifica que 'obtenerCrearHabitos' esté bien escrito

module.exports = router;
