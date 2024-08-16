const Metodos = require('../models/Metodos');

exports.obtenerLanding = (req, res) => {
    Metodos.obtenerTodosLosHabitos((err, habitos) => {
        if (err) {
            return res.status(500).send('Error obteniendo hábitos');
        }
        res.render('vistaLanding', { 
            titulo: 'Bienvenido a Ponte el Hábito',
            habitos: habitos 
        });
    });
};
