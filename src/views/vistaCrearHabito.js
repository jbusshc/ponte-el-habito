class VistaCrearHabito {
    constructor() {}

    // Método para renderizar la vista de creación de hábito
    render(res) {
        res.render('htmlCrearHabito', { 
            titulo: 'Creador de Hábito'
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

module.exports = new VistaCrearHabito();