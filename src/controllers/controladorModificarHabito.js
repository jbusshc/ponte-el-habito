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
            const habitoActual = await Modelo.habito.obtener_habito_por_id(id, tipo);

            // Si algún campo es nulo, se conserva el valor actual

            console.log(habitoActual)

            const nombreFinal = nombre || habitoActual.HABITO_NOM;
            const parametroFinal = tipo == 1 ? {
                tipolim: tipolim || habitoActual.HABITOCUA_TIPOLIM,
                cantidad: cantidad || habitoActual.HABITOCUA_CANTIDAD
            } : null;

            
            // Proceder a modificar el hábito con los valores finales
            await Modelo.habito.modificar_habito(id, nombreFinal, tipo, parametroFinal);
            res.json({ success: true });
        } catch (err) {
            console.error('Error al modificar el hábito:', err);
            res.json({ success: false, error: err.message });
        }
    }


    obtenerDetallesHabito(req, res) {
        const habitId = req.params.id;
        const tipo = req.query.tipo;

        console.log(habitId, tipo);
        Modelo.habito.obtener_habito_por_id(habitId, tipo)
            .then(habito => {
                res.json(habito);
            })
            .catch(err => {
                res.status(500).send('Error obteniendo el hábito');
            });
    }
}

module.exports = new ControladorModificarHabito();
