const modelo = require('../models/modelo');
const vistaExportarImportar = require('../views/vistaExportarImportar');
const fs = require('fs');
const path = require('path');

class ControladorExportarImportar {
    constructor() {}

    obtenerExportarImportar(req, res) {
        vistaExportarImportar.render(res, req);
    }

    async solicitarImportar(req, res) {
        try {
            // Verifica si hay un archivo adjunto en la solicitud
            if (!req.file) {
                throw new Error('No se ha proporcionado ningún archivo para importar');
            }
    
            // Lee el archivo cargado por el usuario
            const filePath = path.join(__dirname, '../../uploads', req.file.filename);
            const jsonData = fs.readFileSync(filePath, 'utf8');
            const baseDeDatosCompleta = JSON.parse(jsonData);
    
            // Llama al método de importar datos del modelo
            await modelo.importar_datos(baseDeDatosCompleta);
    
            // Elimina el archivo después de la importación
            fs.unlink(filePath, (err) => {
                if (err) {
                    console.error('Error al eliminar el archivo:', err);
                } 
            });
    
            res.json({ success: true });
        } catch (error) {
            console.error('Error al importar los datos:', error);
            res.json({ success: false, error: error.message });
        }
    }
  

    async solicitarExportar(req, res) {
        try {
            // Llama al método de exportar datos del modelo
            const filePath = await modelo.exportar_datos();
    
            // Enviar el archivo como una descarga
            res.download(filePath, 'base_de_datos.json', (err) => {
                if (err) {
                    console.error('Error al enviar el archivo:', err);
                    res.status(500).json({ success: false, error: 'Error al enviar el archivo' });
                }
    
                // Elimina el archivo después de que se haya enviado
                fs.unlink(filePath, (err) => {
                    if (err) {
                        console.error('Error al eliminar el archivo:', err);
                    } else {
                        console.log('Archivo eliminado exitosamente');
                    }
                });
            });
        } catch (error) {
            console.error('Error al exportar los datos:', error);
            res.status(500).json({ success: false, error: error.message });
        }
    }
}

module.exports = new ControladorExportarImportar();
