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

    async obtenerActividadPorProductividad(req, res) {
        const habitId = req.params.idh;

        try {
            const actividades = await Modelo.regact.obtener_actividad_por_id(habitId);
            
            if (actividades.length > 0) {
                
                res.json({ actividades: actividades });  // Enviar actividades como JSON
                
            } else {
                res.json({ actividades: [] });  // Si no hay actividades, enviar una matriz vacía
            }
        } catch (err) {
            console.error('Error al obtener la actividad:', err);
            res.status(500).json({ error: 'Error obteniendo la actividad' });
        }
    }
}

module.exports = new ControladorHistorialProductividad();
