class VistaGestorHabito {
    constructor() {}

    // Método para renderizar la vista de creación de hábito
    render(res, habitos) {
        res.render('htmlGestorHabito', { 
            titulo: 'Gestor de Hábitos',
            habitos: habitos,
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
module.exports = new VistaGestorHabito();