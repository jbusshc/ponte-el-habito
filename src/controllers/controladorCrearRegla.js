const Modelo = require('../models/modelo');
const vistaCrearRegla = require('../views/vistaCrearRegla');

class ControladorCrearRegla {
    constructor() { }

    obtenerCrearRegla(req, res) {
        Modelo.habito.obtener_lista_habitos()
            .then(resultados => {
                vistaCrearRegla.render(res, resultados);
            })
            .catch(err => {
                vistaCrearRegla.renderizarError(res, 'Error obteniendo reglas');
            });
    }

    async solicitarCrearRegla(req, res) {
        const { ruleName, ruleType } = req.body;
        const ruleHabits = req.body.habitList;
        console.log(ruleHabits); // AYUDA YORCH

        try {
            await Modelo.regla.crear_regla(ruleName, ruleType, ruleHabits);
            res.json({ success: true });
        } catch (err) {
            res.json({ success: false, error: err.message });
        }
    }
}

module.exports = new ControladorCrearRegla();


