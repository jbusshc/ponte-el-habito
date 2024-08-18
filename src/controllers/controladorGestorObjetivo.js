const Modelo = require('../models/modelo');
const vistaGestorObjetivo = require('../views/vistaGestorObjetivo');

class ControladorGestorObjetivo {
    constructor() {}

    obtenerGestorObjetivo(req, res) {
        vistaGestorObjetivo.render(res);
    }
}
module.exports = new ControladorGestorObjetivo();