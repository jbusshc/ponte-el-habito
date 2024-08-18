const Modelo = require('../models/modelo');
const vistaGestorHabito = require('../views/vistaGestorHabito');

class ControladorGestorHabito {
    constructor() {}

    obtenerGestorHabito(req, res) {
        vistaGestorHabito.render(res);
    }
}
module.exports = new ControladorGestorHabito();

