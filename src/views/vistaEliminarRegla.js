class vistaEliminarRegla {
  constructor() {}

  render(res, reglas) {
      res.render('htmlEliminarRegla', { 
          titulo: 'Eliminar Regla',
          reglas: reglas
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

module.exports = new vistaEliminarRegla();