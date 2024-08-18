class VistaPrincipal {
    constructor() {}

    renderizarLanding(res, habitos) {
        res.render('htmlPaginaInicio', { 
            titulo: 'Bienvenido a Ponte el Hábito',
            habitos: habitos,
        });
    }

    renderizarError(res, mensaje) {
        res.status(500).render('error', {
            titulo: 'Error',
            mensaje: mensaje
        });
    }
}

module.exports = new VistaPrincipal();
