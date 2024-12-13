class VistaRegistrarActividad {
    constructor() {}

    render(res, habitos) {
        res.render('htmlRegistrarActividad', { 
            titulo: 'Registrar Actividad',
            habitos: habitos  // Pasar la lista de hábitos a la vista
        });
    }

    renderizarError(res, mensaje) {
        res.status(500).render('error', {
            titulo: 'Error',
            mensaje: mensaje
        });
    }
}

module.exports = new VistaRegistrarActividad();
