const Modelo = require('../models/modelo');
const vistaGestorObjetivo = require('../views/vistaGestorObjetivo');

class ControladorGestorObjetivo {
    constructor() {}

    obtenerGestorObjetivo(req, res) {
        Modelo.objetivo.obtener_lista_objetivos() 
            .then(resultados => {
                vistaGestorObjetivo.render(res, resultados);
            })
            .catch(err => {
                vistaGestorObjetivo.render(res, 'Error obteniendo los objetivos');
            });
    }
}
module.exports = new ControladorGestorObjetivo();