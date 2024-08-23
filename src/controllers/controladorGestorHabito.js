const Modelo = require('../models/modelo');
const vistaGestorHabito = require('../views/vistaGestorHabito');

class ControladorGestorHabito {
    constructor() {}

    obtenerGestorHabito(req, res) {
        Modelo.habito.obtener_lista_habitos()
            .then(resultados => {
                vistaGestorHabito.render(res, resultados);
            })
            .catch(err => {
                vistaGestorHabito.render(res, 'Error obteniendo habitos');
            });
    }
}
module.exports = new ControladorGestorHabito();

