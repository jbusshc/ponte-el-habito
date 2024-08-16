const CrearHabito = require('../models/Metodos');

exports.obtenerCrearHabitos = (req, res) => {
  res.render('vistaCrearHabito', { titulo: 'Creador de Hábito' });
};
