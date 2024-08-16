const mariadb = require('mariadb');

// Crear un pool de conexiones
const pool = mariadb.createPool({
    host: '127.0.0.1',       // Host de la base de datos
    user: 'root',    // Usuario de la base de datos
    password: '123', // Contraseña de la base de datos
    database: 'ponteelhabito', // Nombre de la base de datos
    connectionLimit: 5       // Número máximo de conexiones en el pool
});


class Habito {

    constructor() {}

    async crear_habito(p_nom, p_tipo, p_parametro) {
        let connection;
        try { 
            let sql = 'INSERT INTO HABITO (HABITO_NOM) VALUES (?)';
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_nom]);
            console.log('Hábito creado con ID: ' + results.insertId);
          
            if (p_tipo == 'B') {
                sql = 'INSERT INTO HABITOBIN (HABITOBIN_IDH) VALUES (?)';
                let binResults = await connection.query(sql, [results.insertId]);
                console.log('Hábito binario creado con ID: ' + binResults.insertId);
            } else {
                sql = 'INSERT INTO HABITOCUA (HABITOCUA_TIPOLIM, HABITOCUA_CANTIDAD, HABITOCUA_IDH) VALUES (?, ?, ?)';
                let cuaResults = await connection.query(sql, [p_parametro.tipolim, p_parametro.cantidad, results.insertId]);
                console.log('Hábito cuantativo con: ' + p_parametro.tipolim + p_parametro.cantidad);
            }
        } catch (err) {
            console.error('Error al crear el hábito: ' + err.stack);
        }finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async modificar_habito(p_id, p_nom, p_tipo, p_parametro) {
        let sql = 'UPDATE HABITO SET HABITO_NOM = ? WHERE HABITO_ID = ?';
        let connection;    
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_nom, p_id]);
            console.log('Hábito modificado con ID: ' + results.insertId);
          
            if (p_tipo == 'C') {
                sql = 'UPDATE HABITOCUA SET HABITOCUA_TIPOLIM = ?, HABITOCUA_CANTIDAD = ? WHERE HABITOCUA_IDH = ?';
                let cuaResults = await connection.query(sql, [p_parametro.tipolim, p_parametro.cantidad, p_id]);
                console.log('Hábito cuantativo modificado con ID: ' + p_id);
            } 
        } catch (err) {
            console.error('Error al modificar el hábito: ' + err.stack);
        }finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

  async eliminar_habito(p_id, p_tipo) {
      let sql;
      let connection;
      try {
            connection = await pool.getConnection();
          if (p_tipo == 'B') {
              sql = 'DELETE FROM HABITOBIN WHERE HABITOBIN_IDH = ?';
              let binResults = await connection.query(sql, [p_id]);
              console.log('Hábito binario eliminado con ID: ' + p_id);
          } else {
              sql = 'DELETE FROM HABITOCUA WHERE HABITOCUA_IDH = ?';
              let cuaResults = await connection.query(sql, [p_id]);
              console.log('Hábito cuantativo eliminado con ID: ' + p_id);
          }

          sql = 'DELETE FROM HABITO WHERE HABITO_ID = ?';
          let results = await connection.query(sql, [p_id]);
          console.log('Hábito eliminado con ID: ' + p_id);
      } catch (err) {
          console.error('Error al eliminar el hábito: ' + err.stack);
      }finally {
        if (connection) connection.release(); // Liberar la conexión al pool
      }
  }

  async obtener_lista_habitos() {
      let sql = 'SELECT * FROM HABITO';
      let connection;
      connection = await pool.getConnection();
      try {
          let results = await connection.query(sql);
          console.log('Lista de hábitos: ' + results);
          return results;
      } catch (err) {
          console.error('Error al obtener la lista de hábitos: ' + err.stack);
          return [];
      }finally {
        if (connection) connection.release(); // Liberar la conexión al pool
      }
  }

  //testeo de modificar
  async obtener_habito_por_id(p_id) {
    let sql = 'SELECT HABITO_NOM HABITO_IDT FROM HABITO WHERE HABITO_ID = ?';
    let connection;
    try{
        connection = await pool.getConnection();
        let results = await connection.query(sql, [p_id]);
        if (results.length > 0) {
            let habito = results[0];
            return {
                nombre: habito.HABITO_NOM,
                tipo: habito.HABITO_IDT,
            };
        } else {
            return null;
        }
    } catch (err) {
        console.error('Error al obtener el hábito por ID: ' + err.stack);
        return null;
    } finally {
        if (connection) connection.release();
    }
  }
}

class Regla {

    constructor() {}

    async crear_regla(p_nom, p_tipo, p_habitos_seleccionados) {
        let sql = 'INSERT INTO REGLA (REGLA_NOM, REGLA_TIPO, REGLA_ESTADO) VALUES (?, ?, ?)';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_nom, p_tipo, 'A']);
            let reglaId = results.insertId;
            console.log('Regla creada con ID: ' + reglaId);

            for (let habito of p_habitos_seleccionados) {
                sql = 'INSERT INTO REGLAHABITO (REGLAHABITO_IDR, REGLAHABITO_IDH) VALUES (?, ?)';
                let habitoResults = await connection.query(sql, [reglaId, habito]);
                console.log('Relación regla-hábito creada con ID: ' + habitoResults.insertId);
            }
        } catch (err) {
            console.error('Error al crear la regla: ' + err.stack);
        }finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async modificar_regla(p_id, p_nom, p_tipo, p_estado, p_habitos_seleccionados) {
        let sql = 'UPDATE REGLA SET REGLA_NOM = ?, REGLA_TIPO = ?, REGLA_ESTADO = ? WHERE REGLA_ID = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_nom, p_tipo, p_estado, p_id]);
            console.log('Regla modificada con ID: ' + results.insertId);
            
            // Eliminar las reglas que están en la tabla pero no en p_habitos_seleccionados
            sql = 'DELETE FROM REGLAHABITO WHERE REGLAHABITO_IDR = ? AND REGLAHABITO_IDH NOT IN (?)';
            let deleteResults = await connection.query(sql, [p_id, p_habitos_seleccionados]);
            console.log('Relaciones regla-hábito eliminadas: ' + deleteResults);
            
            // Insertar los hábitos seleccionados que no están en la tabla
            sql = 'INSERT INTO REGLAHABITO (REGLAHABITO_IDR, REGLAHABITO_IDH) SELECT ?, ? FROM DUAL OT EXISTS (SEWHERE NLECT * FROM REGLAHABITO WHERE REGLAHABITO_IDR = ? AND REGLAHABITO_IDH = ?)';
            for (let habito of p_habitos_seleccionados) {
                let habitoResults = await connection.query(sql, [p_id, habito, p_id, habito]);
                console.log('Relación regla-hábito creada con ID: ' + habitoResults.insertId);
            }
        } catch (err) {
            console.error('Error al modificar la regla: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
  
    async eliminar_regla(p_id) { 
        let connection;
        try{
            connection = await pool.getConnection();
            let sql = 'DELETE FROM REGLAHABITO WHERE REGLAHABITO_IDR = ?';
            let deleteResults = await connection.query(sql, [p_id]);
            console.log('Relaciones regla-hábito eliminadas: ' + deleteResults);
      
            sql = 'DELETE FROM REGLA WHERE REGLA_ID = ?';
            let results = await connection.query(sql, [p_id]);
            console.log('Regla eliminada con ID: ' + results.insertId);
        }catch (err) {
            console.error('Error al modificar la regla: ' + err.stack);
        }finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
  
    async obtener_lista_reglas() {
        let sql = 'SELECT * FROM REGLA';
        let connection; 
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql);
            console.log('Lista de reglas: ' + results);
            return results;
        } catch (err) {       
            console.error('Error al obtener la lista de reglas: ' + err.stack);
            return [];
        }finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
}

class Objetivo {
    constructor() {}

    async crear_objetivo(p_idh, p_fechaini, p_fechafin, p_repeticiones) {
        let sql = 'INSERT INTO OBJETIVO (OBJETIVO_IDH, OBJETIVO_FECHAINI, OBJETIVO_FECHAFIN, OBJETIVO_REPETICIONES) VALUES (?, ?, ?, ?)';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_idh, p_fechaini, p_fechafin, p_repeticiones]);
            console.log('Objetivo creado con ID: ' + results.insertId);
        } catch (err) {
            console.error('Error al crear el objetivo: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async modificar_objetivo(p_id, p_idh, p_fechaini, p_fechafin, p_repeticiones) {
        let sql = 'UPDATE OBJETIVO SET OBJETIVO_IDH = ?, OBJETIVO_FECHAINI = ?, OBJETIVO_FECHAFIN = ?, OBJETIVO_REPETICIONES = ? WHERE OBJETIVO_ID = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_idh, p_fechaini, p_fechafin, p_repeticiones, p_id]);
            console.log('Objetivo modificado con ID: ' + p_id);
        } catch (err) {
            console.error('Error al modificar el objetivo: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async eliminar_objetivo(p_id) {
        let sql = 'DELETE FROM OBJETIVO WHERE OBJETIVO_ID = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_id]);
            console.log('Objetivo eliminado con ID: ' + results.insertId);
        } catch (err) {
            console.error('Error al eliminar el objetivo: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
    async obtener_lista_objetivos() {
        let sql = 'SELECT * FROM OBJETIVO';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql);
            console.log('Lista de objetivos: ' + results);
            return results;
        } catch (err) {
            console.error('Error al obtener la lista de objetivos: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
}

class RegistroActividad {
    constructor() {}
    
    async crear_actividad(p_fecha, p_tipo, p_idh, p_cantidad) {
        let sql = 'INSERT INTO REGACTIVIDAD (REGACTIVIDAD_FECHA, REGACTIVIDAD_IDH) VALUES (?, ?)';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_fecha, p_idh]);
            console.log('Registro de actividad creado con ID: ' + results.insertId);
            
            if (p_tipo == 'B') {
                let sql2 = 'INSERT INTO REGHABITOBIN (REGHABITOBIN_COMPLETADO, REGHABITOBIN_IDR) VALUES (?, ?)';
                let results2 = await connection.query(sql2, [p_cantidad, results.insertId, p_idh]);
                console.log('Registro de hábito binario creado con ID: ' + results2.insertId);
            }
            else {
                let sql2 = 'INSERT INTO REGHABITOCUA (REGHABITOCUA_CANTIDAD, REGHABITOCUA_IDR) VALUES  (?, ?)';
                let results2 = await connection.query(sql2, [p_cantidad, results.insertId, p_idh]);
                console.log('Registro de hábito cuantativo creado con ID: ' + results2.insertId);
            }
        }
        catch (err) {
            console.error('Error al registrar la actividad: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
    async modificar_actividad(p_id, p_tipo, p_cantidad) {
        let connection;
        try {
            connection = await pool.getConnection();            
            if (p_tipo == 'B') {
                let sql2 = 'UPDATE REGHABITOBIN SET REGHABITOBIN_COMPLETADO = ? WHERE REGHABITOBIN_IDR = ?';
                let results2 = await connection.query(sql2, [p_cantidad, p_id]);
                console.log('Registro de hábito binario modificado con ID: ' + results2.insertId);
            }
            else {
                let sql2 = 'UPDATE REGHABITOCUA SET REGHABITOCUA_CANTIDAD = ? WHERE REGHABITOCUA_IDR = ?';
                let results2 = await connection.query(sql2, [p_cantidad, p_id]);
                console.log('Registro de hábito cuantativo modificado con ID: ' + results2.insertId);
            }
        }
        catch (err) {
            console.error('Error al modificar la actividad: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
    async obtener_id_actividad(p_fecha, p_idh) {
        let sql = 'SELECT REGACTIVIDAD_ID FROM REGACTIVIDAD WHERE REGACTIVIDAD_FECHA = ? AND REGACTIVIDAD_IDH = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_fecha, p_idh]);
            console.log('ID de la actividad: ' + results.insertId);
            return results;
        } catch (err) {
            console.error('Error al obtener el ID de la actividad: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
    async eliminar_actividad(p_id) {
        let sql = 'DELETE FROM REGACTIVIDAD WHERE REGACTIVIDAD_ID = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_id]);
            console.log('Registro de actividad eliminado con ID: ' + results.insertId);
        } catch (err) {
            console.error('Error al eliminar la actividad: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
    async obtener_lista_actividades() {
        let sql = 'SELECT * FROM REGACTIVIDAD';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql);
            console.log('Lista de actividades: ' + results);
            return results;
        } catch (err) {
            console.error('Error al obtener la lista de actividades: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }       
}

class HistorialProductividad {
    constructor() {}

    async crear_historial(p_idr, p_fecha, p_completado) {
        let sql = 'INSERT INTO HISTORIALPROD (HISTORIALPRODUCTIVIDAD_FECHA, HISTORIALPROD_COMPLETADA, HISTORIALPROD_IDR) VALUES (?, ?, ?)';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_fecha, p_completado, p_idr]);
            console.log('Historial de productividad creado con ID: ' + results.insertId);
        } catch (err) {
            console.error('Error al crear el historial de productividad: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
    
    async modificar_historial(p_id, p_completado) {
        let sql = 'UPDATE HISTORIALPROD SET HISTORIALPROD_COMPLETADA = ? WHERE HISTORIALPROD_ID = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_completado, p_id]);
            console.log('Historial de productividad modificado con ID: ' + results.insertId);
        } catch (err) {
            console.error('Error al modificar el historial de productividad: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async eliminar_historial(p_id) {
        let sql = 'DELETE FROM HISTORIALPROD WHERE HISTORIALPROD_ID = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_id]);
            console.log('Historial de productividad eliminado con ID: ' + results.insertId);
        } catch (err) {
            console.error('Error al eliminar el historial de productividad: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async obtener_lista_historiales() {
        let sql = 'SELECT * FROM HISTORIALPROD';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql);
            console.log('Lista de historiales de productividad: ' + results);
            return results;
        } catch (err) {
            console.error('Error al obtener la lista de historiales de productividad: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
}

module.exports = {
    Habito,
    Regla,
    Objetivo,
    RegistroActividad,
    HistorialProductividad
};
