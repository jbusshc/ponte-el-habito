const Modelo = require('../models/modelo');
const vistaEliminarRegla = require('../views/vistaEliminarRegla');

class ControladorEliminarRegla {
    constructor() { }

    obtenerEliminarRegla(req, res) {
        Modelo.regla.obtener_lista_reglas()
        .then(resultados => {
            vistaEliminarRegla.render(res, resultados);
        })
        .catch(err => {
            vistaEliminarRegla.renderizarError(res, 'Error obteniendo hábitos');
    });
    }

    async solicitarEliminarRegla(req, res) {
        const {id} = req.body;

        try {
            await Modelo.regla.eliminar_regla(id);
            res.json({ success: true });
        } catch (err) {
            res.json({ success: false, error: err.message });
        }
    }
}

module.exports = new ControladorEliminarRegla();