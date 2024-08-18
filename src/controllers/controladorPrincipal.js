// controllers/controladorLanding.js
const Modelo = require('../models/modelo');
const VistaPrincipal = require('../views/vistaPrincipal');

class ControladorPrincipal {
    constructor() {}

    obtenerPaginaInicio(req, res) {
        Modelo.habito.obtener_lista_habitos()
            .then(resultados => {
                VistaPrincipal.renderizarLanding(res, resultados);
            })
            .catch(err => {
                VistaPrincipal.renderizarError(res, 'Error obteniendo hábitos');
            });
    }
}
module.exports = new ControladorPrincipal();
