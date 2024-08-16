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
            let sql = 'INSERT INTO HABITO (HABITO_NOM, HABITO_IDT) VALUES (?, ?)';
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_nom, p_tipo]);
            console.log('Hábito creado con ID: ' + results.insertId);
          
            if (p_tipo == 1) { // Hábito cuantitativo
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
          
            if (p_tipo == 1) {
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
          if (p_tipo == 1){
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
      try {
            connection = await pool.getConnection();
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
    
    async crear_actividad(p_fecha, p_idh, p_cantidad) {
        let sql = 'INSERT INTO REGACTIVIDAD (REGACTIVIDAD_FECHA, REGACTIVIDAD_IDH, REGACTIVIDAD_CANTIDAD) VALUES (?, ?, ?)';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_fecha, p_idh, p_cantidad]);
            console.log('Registro de actividad creado con ID: ' + results.insertId);
        }
        catch (err) {
            console.error('Error al registrar la actividad: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
    async modificar_actividad(p_id, p_cantidad) {
        let connection;
        try {
            connection = await pool.getConnection();            
            let sql = 'UPDATE REGACTIVIDAD SET REGACTIVIDAD_CANTIDAD = ? WHERE REGACTIVIDAD_ID = ?';
            let results = await connection.query(sql, [p_cantidad, p_id]);
            let estefi = await console.log('Registro de actividad modificado con ID: ' + p_id);
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
            console.log('ID de la actividad: ' + p_idh);
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
            console.log('Lista de actividades: ' + results[0].REGACTIVIDAD_FECHA + results[0].REGACTIVIDAD_IDH); // results[0].REGACTIVIDAD_FECHA + results[0].REGACTIVIDAD_IDH);
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
        let sql = 'INSERT INTO HISTORIALPROD (HISTORIALPROD_FECHA, HISTORIALPROD_COMPLETADA, HISTORIALPROD_IDR) VALUES (?, ?, ?)';
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
    
    async modificar_historial(p_idr, p_fecha, p_completado) {
        let sql = 'UPDATE HISTORIALPROD SET HISTORIALPROD_COMPLETADA = ? WHERE HISTORIALPROD_IDR = ? AND HISTORIALPROD_FECHA = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_completado, p_idr, p_fecha]);
            console.log('Historial de productividad modificado con ID: ' + results.insertId);
        } catch (err) {
            console.error('Error al modificar el historial de productividad: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async eliminar_historial(p_idr, p_fecha) {
        let sql = 'DELETE FROM HISTORIALPROD WHERE HISTORIALPROD_IDR = ? AND HISTORIALPROD_FECHA = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_id, p_fecha]);
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
    
    async visualizar_historial(p_idr, p_fechaini, p_fechafin) {
        let sql = 'SELECT * FROM HISTORIALPROD WHERE HISTORIALPROD_IDR = ? AND HISTORIALPROD_FECHA BETWEEN ? AND ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_idr, p_fechaini, p_fechafin]);
            console.log('Historial de productividad visualizado: ' + results);
            return results;
        } catch (err) {
            console.error('Error al visualizar el historial de productividad: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
        
}

let habito_1 = new Habito();
let regla_1 = new Regla();
let objetivo_1 = new Objetivo();
let regact_1 = new RegistroActividad();
let histprod_1 = new HistorialProductividad();

let p_parametro = {
  tipolim: "<=",
  cantidad: 60
};

let p_habitos_seleccionados = [10, 9];

//histprod_1.crear_historial(1, "2024-06-15", 'S')
//histprod_1.crear_historial(2, "2024-08-15", 'N')
//histprod_1.visualizar_historial(1, "2024-06-10", "2024-08-15")