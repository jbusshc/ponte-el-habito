const Modelo = require('../models/modelo');
const vistaRegistrarActividad = require('../views/vistaRegistrarActividad');

class ControladorRegistrarActividad {

    async obtenerRegistrarActividad(req, res) {
        try {
            const habitos = await Modelo.habito.obtener_lista_habitos();  // Obtener la lista de hábitos
            vistaRegistrarActividad.render(res, habitos);  // Pasar la lista de hábitos a la vista
        } catch (err) {
            console.error('Error obteniendo hábitos:', err);
            vistaRegistrarActividad.renderizarError(res, 'Error obteniendo hábitos');
        }
    }

    async registrarActividad(req, res) {
        const { fecha, habitoId, cantidad } = req.body;
        try {
            await Modelo.regact.crear_actividad(fecha, habitoId, cantidad);
            console.log('Actividad registrada:', fecha, habitoId, cantidad);
            await Modelo.histprod.actualizar_histprod_por_habito(habitoId, fecha);
            console.log('Historial de producción actualizado');
            res.json({ success: true });
        } catch (err) {
            console.error('Error al registrar la actividad:', err);
            res.json({ success: false, error: err.message });
        }
    }
}

module.exports = new ControladorRegistrarActividad();
