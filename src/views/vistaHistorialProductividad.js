class VistaHistorialProductividad {
    constructor() {}

    render(res, reglas) {
        res.render('htmlHistorialProductividad', { 
            titulo: 'Historial de productividad',
            reglas: reglas
        });
    }

    renderizarError(res, mensaje) {
        res.status(500).render('error', {
            titulo: 'Error',
            mensaje: mensaje
        });
    }
}

module.exports = new VistaHistorialProductividad();
