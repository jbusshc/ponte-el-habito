const Modelo = require('../models/modelo');
const vistaCrearHabito = require('../views/vistaCrearHabito');

class ControladorCrearHabito {
    constructor() { }

    obtenerCrearHabito(req, res) {
        vistaCrearHabito.render(res);
    }

    async solicitarCrearHabito(req, res) {
        const { habitName, habitType, cantidad, tipolim } = req.body;

        let parametro = null;

        if (habitType === 'quantitative') {
            parametro = {
                cantidad: cantidad || null,
                tipolim: tipolim || null
            };
        }

        try {
            await Modelo.habito.crear_habito(habitName, habitType === 'quantitative' ? 1 : 2, parametro);
            res.json({ success: true });
        } catch (err) {
            res.json({ success: false, error: err.message });
        }
    }
}

module.exports = new ControladorCrearHabito();


