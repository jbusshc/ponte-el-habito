const Modelo = require('../models/modelo');
const vistaModificarObjetivo = require('../views/vistaModificarObjetivo');

class ControladorModificarObjetivo {
    constructor() { }
  
    obtenerModificarObjetivo(req, res) {
        Modelo.objetivo.obtener_lista_objetivos()
        .then(resultados => {
            return Modelo.habito.obtener_lista_habitos()
            .then(habitos => {
                vistaModificarObjetivo.render(res, resultados, habitos);
            });
        })
        .catch(err => {
            vistaModificarObjetivo.renderizarError(res, 'Error obteniendo hábitos');
        });
    }

    async solicitarModificarObjetivo(req, res) {
        const objectiveId = req.params.id;
        const { nombre, repeticiones, fechaInicial, fechaFinal, habitId } = req.body;

        try {
            // Obtener los datos actuales del objetivo
            const objetivoActual = await Modelo.objetivo.obtener_objetivo_por_id(objectiveId);

            // Asignar valores nuevos o mantener los existentes
            const nombreFinal = nombre || objetivoActual.OBJETIVO_NOM;
            const fechaInicialFinal = fechaInicial || objetivoActual.OBJETIVO_FECHAINI;
            
            const fechaFinalFinal = fechaFinal || objetivoActual.OBJETIVO_FECHAFIN;
            const repeticionesFinal = repeticiones || objetivoActual.OBJETIVO_REPETICIONES;
            
            // Modificar el objetivo
            await Modelo.objetivo.modificar_objetivo(objectiveId, nombreFinal, habitId, fechaInicialFinal, fechaFinalFinal, repeticionesFinal);
            res.json({ success: true });
        } catch (err) {
            console.error('Error al modificar el objetivo:', err);
            res.json({ success: false, error: err.message });
        }
    }

    async obtenerDetallesObjetivo(req, res) {
        const objectiveId = req.params.id;

        try {
            const objetivo = await Modelo.objetivo.obtener_objetivo_por_id(objectiveId);
            res.json(objetivo);
        } catch (err) {
            console.error('Error al obtener los detalles del objetivo:', err);
            res.json({ success: false, error: err.message });
        }
    }
}

module.exports = new ControladorModificarObjetivo();
