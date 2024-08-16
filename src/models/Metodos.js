const { Habito, Regla, Objetivo, RegistroActividad, HistorialProductividad } = require('./estefi');

// Crear instancias de las clases
const habito = new Habito();
const regla = new Regla();
const objetivo = new Objetivo();
const registroActividad = new RegistroActividad();
const historialProductividad = new HistorialProductividad();

const Metodos = {
    // Métodos para la clase Habito
    obtenerTodosLosHabitos: (callback) => {
        habito.obtener_lista_habitos()
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    crearHabito: (p_nom, p_tipo, p_parametro, callback) => {
        habito.crear_habito(p_nom, p_tipo, p_parametro)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    modificarHabito: (p_id, p_nom, p_tipo, p_parametro, callback) => {
        habito.modificar_habito(p_id, p_nom, p_tipo, p_parametro)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    eliminarHabito: (p_id, p_tipo, callback) => {
        habito.eliminar_habito(p_id, p_tipo)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    eliminarHabito: (p_id, p_tipo, callback) => {
        habito.eliminar_habito(p_id, p_tipo)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },
    
    // Métodos para la clase Regla
    obtenerTodasLasReglas: (callback) => {
        regla.obtener_lista_reglas()
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    crearRegla: (p_nom, p_tipo, p_habitos_seleccionados, callback) => {
        regla.crear_regla(p_nom, p_tipo, p_habitos_seleccionados)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    modificarRegla: (p_id, p_nom, p_tipo, p_habitos_seleccionados, callback) => {
        regla.modificar_regla(p_id, p_nom, p_tipo, p_habitos_seleccionados)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    eliminarRegla: (p_id, callback) => {
        regla.eliminar_regla(p_id)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    // Métodos para la clase Objetivo
    obtenerTodosLosObjetivos: (callback) => {
        objetivo.obtener_lista_objetivos()
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    crearObjetivo: (p_tiempo, p_repeticiones, callback) => {
        objetivo.crear_objetivo(p_tiempo, p_repeticiones)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    modificarObjetivo: (p_id, p_tiempo, p_repeticiones, callback) => {
        objetivo.modificar_objetivo(p_id, p_tiempo, p_repeticiones)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    eliminarObjetivo: (p_id, callback) => {
        objetivo.eliminar_objetivo(p_id)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    // Métodos para la clase RegistroActividad
    obtenerTodasLasActividades: (callback) => {
        registroActividad.obtener_lista_actividades()
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    crearActividad: (p_fecha, p_tipo, p_idh, p_cantidad, callback) => {
        registroActividad.crear_actividad(p_fecha, p_tipo, p_idh, p_cantidad)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    modificarActividad: (p_id, p_tipo, p_cantidad, callback) => {
        registroActividad.modificar_actividad(p_id, p_tipo, p_cantidad)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    eliminarActividad: (p_id, callback) => {
        registroActividad.eliminar_actividad(p_id)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    obtenerIdActividad: (p_fecha, p_idh, callback) => {
        registroActividad.obtener_id_actividad(p_fecha, p_idh)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    // Métodos para la clase HistorialProductividad
    obtenerTodosLosHistoriales: (callback) => {
        historialProductividad.obtener_lista_historiales()
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    crearHistorial: (p_idr, p_fecha, p_completado, callback) => {
        historialProductividad.crear_historial(p_idr, p_fecha, p_completado)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    modificarHistorial: (p_id, p_completado, callback) => {
        historialProductividad.modificar_historial(p_id, p_completado)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    },

    eliminarHistorial: (p_id, callback) => {
        historialProductividad.eliminar_historial(p_id)
            .then(resultados => callback(null, resultados))
            .catch(err => callback(err, null));
    }
};

module.exports = Metodos;
