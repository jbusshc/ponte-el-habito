const Modelo = require('../models/modelo');
const vistaModificarHabito = require('../views/vistaModificarHabito');

class ControladorModificarHabito {
    constructor() { }

    obtenerModificarHabito(req, res) {

        Modelo.habito.obtener_lista_habitos()
            .then(resultados => {
                vistaModificarHabito.render(res, resultados);
            })
            .catch(err => {
                vistaModificarHabito.renderizarError(res, 'Error obteniendo hábitos');
        });
        
    }

    async solicitarModificarHabito(req, res) {
        const { nombre, tipo, cantidad, tipolim, id } = req.body;

        try {
            // Obtener el hábito actual para verificar sus valores
            const habitoActual = await Modelo.habito.obtener_habito_por_id(id);

            // Si algún campo es nulo, se conserva el valor actual

            const nombreFinal = nombre || habitoActual.HABITO_NOM;
            const tipoFinal = tipo;
            const parametroFinal = tipoFinal == 1 ? {
                tipolim: tipolim || habitoActual.HABITOCUA_TIPOLIM,
                cantidad: cantidad || habitoActual.HABITOCUA_CANTIDAD
            } : null;

            
            // Proceder a modificar el hábito con los valores finales
            await Modelo.habito.modificar_habito(id, nombreFinal, tipoFinal, parametroFinal);
            res.json({ success: true });
        } catch (err) {
            console.error('Error al modificar el hábito:', err);
            res.json({ success: false, error: err.message });
        }
    }


    obtenerDetallesHabito(req, res) {
        const habitId = req.params.id;
        Modelo.habito.obtener_habito_por_id(habitId, (err, habito) => {
            if (err) {
                return res.status(500).send('Error obteniendo el hábito');
            }
            res.json(habito);
        });
    }
}

module.exports = new ControladorModificarHabito();
