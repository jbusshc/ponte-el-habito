class VistaPrincipal {
    constructor() {}

    // Método para renderizar la vista de la Pagina de Inicio
    render(res, habitos_completados, habitos_no_completados, reglas_completadas, reglas_no_completadas) {
        res.render('htmlPaginaInicio', { 
            titulo: 'Bienvenido a Ponte el Hábito',
            habitos_completados: habitos_completados,
            habitos_no_completados: habitos_no_completados,
            reglas_completadas: reglas_completadas,
            reglas_no_completadas: reglas_no_completadas,
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