const Modelo = require('../models/modelo');
const vistaHistorialHabito = require('../views/vistaHistorialHabito');

class ControladorHistorialHabito {

    obtenerHistorialHabito(req, res) {
        Modelo.habito.obtener_lista_habitos()
            .then(resultados => {
                vistaHistorialHabito.render(res, resultados);
            })
            .catch(err => {
                vistaHistorialHabito.renderizarError(res, 'Error obteniendo hábitos');
        });
    }

    async obtenerActividadPorHabito(req, res) {
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

module.exports = new ControladorHistorialHabito();
