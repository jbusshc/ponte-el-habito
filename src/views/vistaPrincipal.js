class VistaPrincipal {
    constructor() {}

    // Método para renderizar la vista de la Pagina de Inicio
    renderizarLanding(res, habitos) {
        res.render('htmlPaginaInicio', { 
            titulo: 'Bienvenido a Ponte el Hábito',
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
module.exports = new VistaPrincipal();