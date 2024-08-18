const Modelo = require('../models/modelo');
const vistaEliminarHabito = require('../views/vistaEliminarHabito');

class ControladorEliminarHabito {
    constructor() { }

    obtenerEliminarHabito(req, res) {
        Modelo.habito.obtener_lista_habitos()
        .then(resultados => {
            vistaEliminarHabito.render(res, resultados);
        })
        .catch(err => {
            vistaEliminarHabito.renderizarError(res, 'Error obteniendo hábitos');
    });
    }

    async solicitarEliminarHabito(req, res) {
        const { id, tipo } = req.body;

        try {
            await Modelo.habito.eliminar_habito(id, tipo);
            res.json({ success: true });
        } catch (err) {
            res.json({ success: false, error: err.message });
        }
    }
}

module.exports = new ControladorEliminarHabito();