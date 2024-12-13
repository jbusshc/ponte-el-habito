const Modelo = require('../models/modelo');
const vistaHistorialProductividad = require('../views/vistaHistorialProductividad');

class ControladorHistorialProductividad {

    obtenerHistorialProductividad(req, res) {
        Modelo.regla.obtener_lista_reglas()
            .then(resultados => {
                vistaHistorialProductividad.render(res, resultados);
            })
            .catch(err => {
                vistaHistorialProductividad.renderizarError(res, 'Error obteniendo reglas');
        });
    }

    async solicitarHistorialProductividad(req, res) {
        const idr = req.params.idr; 
        const fechai = req.query.fechai; 
        const fechaf = req.query.fechaf;

        try {
            const histprod = await Modelo.histprod.visualizar_historial(idr, fechai, fechaf);
            
            if (histprod.length > 0) {
                
                res.json({ histprod: histprod });  
                
            } else {
                res.json({ histprod: [] });  // Si no hay actividades, enviar una matriz vacía
            }
        } catch (err) {
            console.error('Error al obtener el historial de productividad:', err);
            res.status(500).json({ error: 'Error obteniendo el historial de productividad' });
        }
    }
}

module.exports = new ControladorHistorialProductividad();
