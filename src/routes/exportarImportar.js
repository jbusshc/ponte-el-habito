const express = require('express');
const router = express.Router();
const controladorExportarImportar = require('../controllers/controladorExportarImportar');

// Ruta para mostrar el formulario de exportación e importación
router.get('/exportar-importar', controladorExportarImportar.obtenerExportarImportar);

// Ruta para exportar datos
router.post('/exportar', controladorExportarImportar.solicitarExportar);

// Ruta para importar datos (con manejo de archivo)
router.post('/importar', controladorExportarImportar.solicitarImportar);

module.exports = router;
