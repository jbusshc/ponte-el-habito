class VistaGestorObjetivo {
    constructor() {}

    // Método para renderizar la vista de creación de objetivos
    render(res) {
        res.render('htmlGestorObjetivo', { 
            titulo: 'Gestor de Objetivos'
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

module.exports = new VistaGestorObjetivo();
