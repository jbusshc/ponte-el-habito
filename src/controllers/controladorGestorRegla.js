const Modelo = require('../models/modelo');
const vistaGestorRegla = require('../views/vistaGestorRegla');

class ControladorGestorRegla {
    constructor() {}

    obtenerGestorRegla(req, res) {
      Modelo.regla.obtener_lista_reglas()
        .then(resultados => {
          vistaGestorRegla.render(res, resultados);
        })
        .catch(err => {
          vistaGestorRegla.render(res, 'Error obteniendo las reglas');
        });
    }
}
module.exports = new ControladorGestorRegla();