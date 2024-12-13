class VistaModificarHabito {
    constructor() {}

    // Renderiza la vista de modificar hábitos
    render(res, habitos) {
        res.render('htmlModificarHabito', { 
            titulo: 'Modificar Hábito',
            habitos: habitos
        });
    }

    // Renderiza un error
    renderizarError(res, mensaje) {
        res.status(500).render('error', {
            titulo: 'Error',
            mensaje: mensaje
        });
    }
}

module.exports = new VistaModificarHabito();