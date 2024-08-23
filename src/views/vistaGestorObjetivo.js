class VistaGestorObjetivo {
    constructor() {}

    // Método para renderizar la vista del Gestor de objetivos
    render(res, objetivos) {
        res.render('htmlGestorObjetivo', { 
            titulo: 'Gestor de Objetivos',
            objetivos: objetivos,
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
