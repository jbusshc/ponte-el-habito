const Modelo = require('../models/modelo');
const vistaCrearObjetivo = require('../views/vistaCrearObjetivo');

class ControladorCrearObjetivo {
    constructor() { }

    obtenerCrearObjetivo(req, res) {
        Modelo.habito.obtener_lista_habitos()
            .then(resultados => {
                vistaCrearObjetivo.render(res, resultados);
            })
            .catch(err => {
                vistaCrearObjetivo.renderizarError(res, 'Error obteniendo Objetivos');
            });
    }

    async solicitarCrearObjetivo(req, res) {
        const { habito, repeticiones, fecha_ini: fechaIni, fecha_fin: fechaFin, nombre } = req.body;

        try {
            await Modelo.objetivo.crear_objetivo(habito, fechaIni, fechaFin, repeticiones, nombre);
            res.json({ success: true });
        } catch (err) {
            res.json({ success: false, error: err.message });
        }
    }
}

module.exports = new ControladorCrearObjetivo();


