// controllers/controladorLanding.js
const Modelo = require('../models/modelo');
const VistaPrincipal = require('../views/vistaPrincipal');

class ControladorPrincipal {
    constructor() {}

    async obtenerPaginaInicio(req, res) {

        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
        const day = String(currentDate.getDate()).padStart(2, '0');

        const fecha_hoy = `${year}-${month}-${day}`;
        
        try {
            const habitos_completados = await Modelo.habito.obtener_informacion_habitos_completados(fecha_hoy);
            const habitos_no_completados = await Modelo.habito.obtener_informacion_habitos_no_completados(fecha_hoy);
            const reglas_completadas = await Modelo.regla.obtener_informacion_reglas_completadas(fecha_hoy);
            const reglas_no_completadas = await Modelo.regla.obtener_informacion_reglas_no_completadas(fecha_hoy);
            
            VistaPrincipal.render(res, habitos_completados, habitos_no_completados, reglas_completadas, reglas_no_completadas);
        } catch (err) {
            VistaPrincipal.renderizarError(res, 'Error obteniendo hábitos');
        }
    }
}
module.exports = new ControladorPrincipal();
