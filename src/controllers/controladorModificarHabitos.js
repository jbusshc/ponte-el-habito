const Metodos = require('../models/Metodos');

// Renderiza la vista y carga los hábitos en el listbox
exports.renderizarModificarHabitos = (req, res) => {
    Metodos.obtenerTodosLosHabitos((err, habitos) => {
        if (err) {
            return res.status(500).send('Error obteniendo la lista de hábitos');
        }
        res.render('vistaModificarHabitos', { 
            titulo: 'Modificar Hábito',
            habitos: habitos
        });
    });
};
