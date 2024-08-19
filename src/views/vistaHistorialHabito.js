class VistaHistorialHabitos {
    constructor() {}

    render(res, habitos) {
        res.render('htmlHistorialHabito', { 
            titulo: 'Historial Habito',
            habitos: habitos
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
