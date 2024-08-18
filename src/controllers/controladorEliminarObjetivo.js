const Modelo = require('../models/modelo');
const vistaEliminarObjetivo = require('../views/vistaEliminarObjetivo');

class ControladorEliminarObjetivo {
    constructor() { }

    obtenerEliminarObjetivo(req, res) {
        Modelo.objetivo.obtener_lista_objetivos()
        .then(resultados => {
            vistaEliminarObjetivo.render(res, resultados);
        })
        .catch(err => {
            vistaEliminarObjetivo.renderizarError(res, 'Error obteniendo objetivos');
    });
    }

    async solicitarEliminarObjetivo(req, res) {
        const { id, tipo } = req.body;

        try {
            await Modelo.objetivo.eliminar_objetivo(id);
            res.json({ success: true });
        } catch (err) {
            res.json({ success: false, error: err.message });
        }
    }
}

module.exports = new ControladorEliminarObjetivo();