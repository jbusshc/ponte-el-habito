const Metodos = require('../models/Metodos');

exports.obtenerGestorHabitos = (req, res) => {
    Metodos.obtenerTodosLosHabitos((err, habitos) => {
        if (err) {
            return res.status(500).send('Error obteniendo hábitos');
        }
        res.render('vistaGestorHabitos', { 
            titulo: 'Gestor de Hábitos',
            habitos: habitos 
        });
    });
};
