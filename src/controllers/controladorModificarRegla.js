const Modelo = require('../models/modelo');
const vistaModificarRegla = require('../views/vistaModificarRegla');

class ControladorModificarRegla {
    constructor() { }
  
    obtenerModificarRegla(req, res) {

        Modelo.regla.obtener_lista_reglas()
        .then(resultados => {
            return Modelo.habito.obtener_lista_habitos()
            .then(habitos => {
                vistaModificarRegla.render(res, resultados, habitos);
            });
        })
        .catch(err => {
            vistaModificarRegla.renderizarError(res, 'Error obteniendo hábitos');
        });
    }

    solicitarHabitosRegla(req, res) {

        const reglaId = req.params.id; // Get reglaId from the route parameter
        //console.log("Received Rule ID:", reglaId);
    
        // Assuming Modelo.regla.obtener_habitos_por_regla returns a Promise
        return Modelo.regla.obtener_habitos_por_regla(reglaId)
            .then(habitos => {
                res.json({
                    success: true,
                    habitos: habitos
                });
            })
            .catch(err => {
                console.error('Error retrieving habits:', err);
                res.json({
                    success: false,
                    error: 'Error retrieving habits'
                });
            });

    };

    async solicitarModificarRegla(req, res) {
        const { nombre, tipo, estado, id } = req.body;
        

        const habitos = req.body.habitos;

        try {

            const reglaActual = await Modelo.regla.obtener_regla_por_id(id);

            const nombreFinal = nombre || reglaActual.REGLA_NOM;
            const tipoFinal = tipo || reglaActual.REGLA_TIPO;
            const estadoFinal = estado || reglaActual.REGLA_ESTADO;

            // Proceder a modificar el hábito con los valores finales
            await Modelo.regla.modificar_regla(id, nombreFinal, tipoFinal, estadoFinal, habitos);
            if (estadoFinal == 'A' && reglaActual.REGLA_ESTADO == 'I') { 
                // Código de importación para la fecha en formato "YYYY-MM-DD"
                const currentDate = new Date();
                const year = currentDate.getFullYear();
                const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
                const day = String(currentDate.getDate()).padStart(2, '0');

                const fecha_hoy = `${year}-${month}-${day}`;
                await Modelo.histprod.actualizar_histprod(id, fecha_hoy);
            }
            
            res.json({ success: true });
        } catch (err) {
            console.error('Error al modificar el hábito:', err);
            res.json({ success: false, error: err.message });
        }
    }
    obtenerDetallesRegla(req, res) {
        const reglaId = req.params.id;

        Modelo.regla.obtener_regla_por_id(reglaId)
            .then(regla => {
                res.json(regla);
            })
            .catch(err => {
                res.status(500).send('Error obteniendo la regla');
            });
    }
}

module.exports = new ControladorModificarRegla();
