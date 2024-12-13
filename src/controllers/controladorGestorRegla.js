const Modelo = require('../models/modelo');
const vistaGestorRegla = require('../views/vistaGestorRegla');

class ControladorGestorRegla {
    constructor() {}

    async obtenerGestorRegla(req, res) {

      try {

        const reglas = await Modelo.regla.obtener_lista_reglas();
        //const habitos = await Modelo.regla.obtener_nombre_habitos_por_regla();
        
        vistaGestorRegla.render(res, reglas);
      } catch (err) {
        vistaGestorRegla.renderizarError(res, 'Error obteniendo hábitos o reglas');
      }
    }

    async obtenerHabitosPorRegla(req, res) {
      const { id } = req.params;

      try {
        const habitos = await Modelo.regla.obtener_nombre_habitos_por_reglas(id);
        res.json(habitos);
      } catch (err) {
        res.json({ success: false, error: err.message });
      }
    }
      
}
module.exports = new ControladorGestorRegla();