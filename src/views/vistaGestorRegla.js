class VistaGestorRegla {
  constructor() {}

  // Método para renderizar la vista de Gestor de reglas
  render(res, reglas) {
      res.render('htmlGestorRegla', { 
            titulo: 'Gestor de Reglas',
            reglas: reglas,
      });
  }

  // Método para renderizar la vista con un mensaje de error
  renderizarError(res, mensaje) {
      res.status(500).render('error', {
            titulo: 'Error',
            mensaje: mensaje
      });
  }
}
module.exports = new VistaGestorRegla();