const Modelo = require('../models/modelo');
const vistaGestorRegla = require('../views/vistaGestorRegla');

class ControladorGestorRegla {
    constructor() {}

    obtenerGestorRegla(req, res) {
      vistaGestorRegla.render(res);
    }
}
module.exports = new ControladorGestorRegla();

