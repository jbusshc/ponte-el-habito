class VistaExportarImportar {
    constructor() {}

    // Método para renderizar la vista de creación de hábito
    render(res, req) {
        res.render('htmlExportarImportar', { 
            titulo: 'Exportar e Importar datos',
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
module.exports = new VistaExportarImportar();