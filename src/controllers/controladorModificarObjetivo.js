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

    solicitarHabitosObjetivo(req, res) {

        const ObjetivoId = req.params.id; // Get ObjetivoId from the route parameter
        //console.log("Received Rule ID:", ObjetivoId);
    
        // Assuming Modelo.Objetivo.obtener_habitos_por_Objetivo returns a Promise
        return Modelo.objetivo.obtener_habitos_por_Objetivo(ObjetivoId)
            .then(habitos => {
                res.json({
                    success: true,
                    habitos: habitos
                });
            })
            .catch(err => {
                console.error('Error retrieving habits:', err);
                res.json({
                    success: false,
                    error: 'Error retrieving habits'
                });
            });

    };

    async solicitarModificarObjetivo(req, res) {
        const { nombre, tipo, estado, id } = req.body;

        const habitos = req.body.habitos;
        try {

            const ObjetivoActual = await Modelo.objetivo.obtener_objetivo_por_id(id);

            const nombreFinal = nombre || ObjetivoActual.Objetivo_NOM;
            const tipoFinal = tipo || ObjetivoActual.Objetivo_TIPO;
            const estadoFinal = estado || ObjetivoActual.Objetivo_ESTADO;

            // Proceder a modificar el hábito con los valores finales
            await Modelo.objetivo.modificar_objetivo(id, nombreFinal, tipoFinal, estadoFinal, habitos);
            res.json({ success: true });
        } catch (err) {
            console.error('Error al modificar el hábito:', err);
            res.json({ success: false, error: err.message });
        }
    }
}

module.exports = new ControladorModificarObjetivo();
