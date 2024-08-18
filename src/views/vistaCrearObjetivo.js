class VistaCrearObjetivo {
    constructor() {}
  
      // Método para renderizar la vista de creación de Objetivo
      render(res, habitos) {
          res.render('htmlCrearObjetivo', { 
              titulo: 'Creador de Objetivo',
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
  
  module.exports = new VistaCrearObjetivo();