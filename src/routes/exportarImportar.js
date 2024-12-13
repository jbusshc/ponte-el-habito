const express = require('express');
const router = express.Router();
const controladorExportarImportar = require('../controllers/controladorExportarImportar');
const multer = require('multer');
const path = require('path');

// Configuración de multer para manejar la subida de archivos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Carpeta donde se guardarán los archivos subidos
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);  // Mantener el nombre original del archivo
    }
});

const upload = multer({ storage: storage });

// Ruta para mostrar el formulario de exportación e importación
router.get('/exportar-importar', controladorExportarImportar.obtenerExportarImportar);

// Ruta para exportar datos
router.post('/exportar', controladorExportarImportar.solicitarExportar);

// Ruta para importar datos (con manejo de archivo)
router.post('/importar', upload.single('fileInput'), controladorExportarImportar.solicitarImportar);

module.exports = router;
