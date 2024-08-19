class VistaHistorialHabitos {
    constructor() {}

    render(res, habitos) {
        res.render('htmlHistorialHabitos', { 
            titulo: 'Historial Habitos'
        });
    }

    renderizarError(res, mensaje) {
        res.status(500).render('error', {
            titulo: 'Error',
            mensaje: mensaje
        });
    }
}

module.exports = new VistaHistorialHabitos();
