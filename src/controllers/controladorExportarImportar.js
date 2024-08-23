const modelo = require('../models/modelo');
const Modelo = require('../models/modelo');
const vistaExportarImportar = require('../views/vistaExportarImportar');

class ControladorExportarImportar {
    constructor() {}

    obtenerExportarImportar(req, res) {
        vistaExportarImportar.render(res, req);
    }

    async solicitarImportar(req, res) { 
        try {
            await Modelo.importar_datos();
            res.json({ success: true });
        } catch (error) {
            console.error('Error al importar los datos:', error);
            res.json({ success: false, error: error.message });
        }
    }

    async solicitarExportar(req, res) {
        try {
            await Modelo.exportar_datos();
            res.json({ success: true });
        } catch (error) {
            console.error('Error al exportar los datos:', error);
            res.json({ success: false, error: error.message });
        }
    }
}


module.exports = new ControladorExportarImportar();
