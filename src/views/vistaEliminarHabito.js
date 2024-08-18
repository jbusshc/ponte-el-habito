class vistaEliminarHabito {
    constructor() {}

    render(res, habitos) {
        res.render('htmlEliminarHabito', { 
            titulo: 'Eliminar Hábito',
            habitos: habitos
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

module.exports = new vistaEliminarHabito();