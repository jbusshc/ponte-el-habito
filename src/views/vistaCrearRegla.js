class VistaCrearRegla {
  constructor() {}

    // Método para renderizar la vista de creación de regla
    render(res, habitos) {
        res.render('htmlCrearRegla', { 
            titulo: 'Creador de Regla',
            habitos: habitos
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

module.exports = new VistaCrearRegla();