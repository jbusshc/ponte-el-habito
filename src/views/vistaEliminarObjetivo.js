class vistaEliminarObjetivo {
    constructor() {}

    render(res, objetivos) {
        res.render('htmlEliminarObjetivo', { 
            titulo: 'Eliminar Objetivo',
            objetivos: objetivos
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

module.exports = new vistaEliminarObjetivo();