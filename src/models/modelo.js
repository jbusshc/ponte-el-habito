const pool = require('../../db'); // Importar el pool de conexiones

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
            console.log('Hábito modificado con ID: ' + results);
          
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

            sql = 'DELETE FROM REGACTIVIDAD WHERE REGACTIVIDAD_IDH = ?';
            let results = await connection.query(sql, [p_id]);
            console.log('Registros de actividad elimnados');

            sql = 'DELETE FROM REGLAHABITO WHERE REGLAHABITO_IDH = ?';
            results = await connection.query(sql, [p_id]);
            console.log('Hábito eliminado de reglas')
            
            sql = 'DELETE FROM OBJETIVO WHERE OBJETIVO_IDH = ?'
            results = await connection.query(sql, [p_id]);
            console.log('Nexo con objetivos elimnados');
            //---------------------------------------------------------------------------

            sql = 'DELETE FROM HABITO WHERE HABITO_ID = ?';
            results = await connection.query(sql, [p_id]);
            console.log('Hábito eliminado con ID: ' + p_id);

        } catch (err) {
            console.error('Error al eliminar el hábito: ' + err.stack);
        }finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async obtener_lista_habitos() {
        let sql = 'SELECT HABITO.HABITO_ID, HABITO.HABITO_NOM, HABITO.HABITO_IDT, CASE WHEN HABITO.HABITO_IDT = 2 THEN "No aplica" ELSE HABITOCUA.HABITOCUA_CANTIDAD END AS HABITOCUA_CANTIDAD, CASE WHEN HABITO.HABITO_IDT = 2 THEN "No aplica" ELSE HABITOCUA.HABITOCUA_TIPOLIM END AS HABITOCUA_TIPOLIM FROM HABITO LEFT JOIN HABITOCUA  ON HABITO.HABITO_ID = HABITOCUA.HABITOCUA_IDH;';
        let connection;
        try {
            connection = await pool.getConnection();

            let results = await connection.query(sql);
            //console.log('Lista de hábitos: ' + results);
            return results;
        } catch (err) {
            console.error('Error al obtener la lista de hábitos: ' + err.stack);
            return [];
        }finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async obtener_habito_por_id(p_id, p_tipo){
        let sql = 'SELECT * FROM HABITO WHERE HABITO_ID = ?';
        //p_id = p_id.substring(1);
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_id]);

            if(p_tipo == 1){
                sql = 'SELECT HABITOCUA_TIPOLIM, HABITOCUA_CANTIDAD FROM HABITOCUA WHERE HABITOCUA_IDH = ?';
            let cuaResults = await connection.query(sql, [p_id]);
            if (cuaResults.length > 0) {
                results[0].HABITOCUA_TIPOLIM = cuaResults[0].HABITOCUA_TIPOLIM;
                results[0].HABITOCUA_CANTIDAD = cuaResults[0].HABITOCUA_CANTIDAD;
            }
        }
        
        if (results.length > 0) {
            return results[0];  // Retornar el primer resultado (el hábito encontrado)
        } else {
            console.log(`No se encontró ningún hábito con el ID: ${p_id}`);
            return null;  // Retornar null si no se encuentra el hábito
        }
        } catch (err) {
            console.log('Error al buscar el hábito: ' + err.stack);
            throw err;  // Lanza el error para que pueda ser manejado en otro lugar si es necesario
        } finally {
            if (connection) connection.release();
        }
    }

    async obtener_habitos_completados(p_fecha) {
        // Obtener cantidades de habitos en REGACTIVIDAD
        let sql = 'SELECT HABITO_ID, HABITO_IDT, REGACTIVIDAD_CANTIDAD FROM HABITO, REGACTIVIDAD WHERE REGACTIVIDAD_FECHA = ? AND HABITO_ID = REGACTIVIDAD_IDH';
        let connection;
        try {
            let habitosCompletados = [];
    
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_fecha]);
            
            for (const habito of results) { // Declarar ariable `habito` con `const` o `let`
                if (habito.HABITO_IDT == 1) {
                    sql = 'SELECT HABITOCUA_CANTIDAD, HABITOCUA_TIPOLIM, REGACTIVIDAD_CANTIDAD FROM HABITOCUA, REGACTIVIDAD WHERE HABITOCUA_IDH = ? AND REGACTIVIDAD_IDH = ?';
                    let cuaResults = await connection.query(sql, [habito.HABITO_ID, habito.HABITO_ID]);
                    let cantidad = cuaResults[0].HABITOCUA_CANTIDAD;
                    let regCantidad = cuaResults[0].REGACTIVIDAD_CANTIDAD;
                    let tipolim = cuaResults[0].HABITOCUA_TIPOLIM;
    
                    if (tipolim == "<=") {
                        if (regCantidad <= cantidad) {
                            habitosCompletados.push(habito.HABITO_ID);
                        }
                    } else if (tipolim == ">=") {
                        if (regCantidad >= cantidad) {
                            habitosCompletados.push(habito.HABITO_ID);
                        }
                    } else if (tipolim == "=") {
                        if (regCantidad == cantidad) {
                            habitosCompletados.push(habito.HABITO_ID);
                        }
                    } else if (tipolim == "<") {
                        if (regCantidad < cantidad) {
                            habitosCompletados.push(habito.HABITO_ID);
                        }
                    } else {
                        if (regCantidad > cantidad) {
                            habitosCompletados.push(habito.HABITO_ID);
                        }
                    }
                } else {
                    sql = 'SELECT REGACTIVIDAD_CANTIDAD FROM REGACTIVIDAD WHERE REGACTIVIDAD_IDH = ?';
                    let cuaResults = await connection.query(sql, [habito.HABITO_ID]);
                    let regCantidad = cuaResults[0].REGACTIVIDAD_CANTIDAD;
                    if (regCantidad == 1) {
                        habitosCompletados.push(habito.HABITO_ID);
                    }
                }
            }
            return habitosCompletados;
        } catch (err) {
            console.error('Error al obtener los hábitos completados: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async obtener_informacion_habitos_completados(p_fecha) {
        let connection;
        try {
            connection = await pool.getConnection();
            let habitosCompletados = await this.obtener_habitos_completados(p_fecha);
            let habitos = [];
    
            for (let i = 0; i < habitosCompletados.length; i++) {
                let sql = 'SELECT HABITO_IDT FROM HABITO WHERE HABITO_ID = ?';
                let results = await connection.query(sql, [habitosCompletados[i]]);
                
                // Suponiendo que obtener_habito_por_id es una función asíncrona
                habitos[i] = await this.obtener_habito_por_id(habitosCompletados[i], results[0].HABITO_IDT);
            }
            //console.log('Hábitos completados: ' + habitos);
            return habitos;
        } catch (error) {
            console.error('Error al obtener información de hábitos completados:', error);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
    async obtener_informacion_habitos_no_completados(p_fecha) {
        let connection;
        try {
            connection = await pool.getConnection();
            let habitosCompletados = await this.obtener_habitos_completados(p_fecha);
            let habitos = [];
    
            let sql = 'SELECT HABITO_ID, HABITO_IDT FROM HABITO';
            let results = await connection.query(sql);
    
            for (let i = 0; i < results.length; i++) {
                if (!habitosCompletados.includes(results[i].HABITO_ID)) {
                    habitos.push(await this.obtener_habito_por_id(results[i].HABITO_ID, results[i].HABITO_IDT));
                }
            }
    
            return habitos;
        } catch (error) {
            console.error('Error al obtener información de hábitos no completados:', error);
            return [];
        } finally {
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
                console.log('Relación hábito-regla creada: ' + habito + ', ' + reglaId);
            }   
        } catch (err) {
            console.error('Error al crear la regla: ' + err.stack);
        }finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async modificar_regla(p_id, p_nom, p_tipo, p_estado, p_habitos_seleccionados) {
        console.log(p_estado)
        let sql = 'UPDATE REGLA SET REGLA_NOM = ?, REGLA_TIPO = ?, REGLA_ESTADO = ? WHERE REGLA_ID = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_nom, p_tipo, p_estado, p_id]);
            console.log('Regla modificada con ID: ' + p_id);
            
            // Eliminar las reglas que están en la tabla pero no en p_habitos_seleccionados
            if (p_habitos_seleccionados.length > 0) {
                sql = 'DELETE FROM REGLAHABITO WHERE REGLAHABITO_IDR = ? AND REGLAHABITO_IDH NOT IN (?)';
                let deleteResults = await connection.query(sql, [p_id, p_habitos_seleccionados]);
                console.log('Relaciones regla-hábito eliminadas: ' + deleteResults);
            }
            // Insertar los hábitos seleccionados que no están en la tabla
            sql = 'INSERT INTO REGLAHABITO (REGLAHABITO_IDR, REGLAHABITO_IDH) SELECT ?, ? FROM DUAL WHERE NOT EXISTS (SELECT * FROM REGLAHABITO WHERE REGLAHABITO_IDR = ? AND REGLAHABITO_IDH = ?)';
            for (let habito of p_habitos_seleccionados) {
                let habitoResults = await connection.query(sql, [p_id, habito, p_id, habito]);
                console.log('Relación regla-hábito creada con ID: ' + results.insertId + ', ' + habito);
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

            sql = 'DELETE FROM HISTORIALPROD WHERE HISTORIALPROD_IDR = ?';
            deleteResults = await connection.query(sql, [p_id]);
            console.log('Relaciones en historial de productividad eliminadas: ' + deleteResults);
      
            sql = 'DELETE FROM REGLA WHERE REGLA_ID = ?';
            let results = await connection.query(sql, [p_id]);
            console.log('Regla eliminada con ID: ' + p_id);
        }catch (err) {
            console.error('Error al modificar la regla: ' + err.stack);
        }finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
  
    async obtener_lista_reglas() {
        let sql = 'SELECT * FROM REGLA ORDER BY REGLA_ID ASC';
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

    async obtener_lista_reglas_activas() {
        let sql = 'SELECT * FROM REGLA WHERE REGLA_ESTADO = \'A\'';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql);
            //console.log('Lista de reglas activas: ' + results);
            return results;
        } catch (err) {
            console.error('Error al obtener la lista de reglas activas: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async obtener_lista_reglas_inactivas() {
        let sql = 'SELECT * FROM REGLA WHERE REGLA_ESTADO = \'I\'';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql);
            //console.log('Lista de reglas inactivas: ' + results);
            return results;
        } catch (err) {
            console.error('Error al obtener la lista de reglas inactivas: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }


    async obtener_regla_por_id(p_id) {
        let sql = 'SELECT * FROM REGLA WHERE REGLA_ID = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_id]);
            console.log('Regla obtenida con ID: ' + p_id);
            return results[0];
        } catch (err) {
            console.error('Error al obtener la regla: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async obtener_habitos_por_regla(p_id) {
        let sql = 'SELECT REGLAHABITO_IDH, HABITO_NOM FROM REGLAHABITO, HABITO WHERE REGLAHABITO_IDR = ? AND REGLAHABITO_IDH = HABITO_ID';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_id]);
            console.log('Hábitos obtenidos por regla con ID: ' + p_id);
            //console.log(p_id)
            console.log(results)
            return results;
        } catch (err) {
            console.error('Error al obtener los hábitos por regla: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async obtener_nombre_habitos_por_reglas(p_id){
        let sql = 'SELECT HABITO_NOM FROM REGLAHABITO, HABITO WHERE REGLAHABITO_IDH = HABITO_ID AND REGLAHABITO_IDR = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_id]);
            console.log('Hábitos obtenidos por regla con ID: ' + p_id);
            //console.log(p_id)
            console.log(results)
            return results;
        } catch (err) {
            console.error('Error al obtener los hábitos por regla: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async obtener_informacion_reglas_completadas(p_fecha) {
        let connection;
        try {
            connection = await pool.getConnection();
            let reglas = await this.obtener_lista_reglas();
            let reglasCompletadas = [];
    
            for (let regla of reglas) {
                let sql = 'SELECT * FROM HISTORIALPROD, REGLA WHERE HISTORIALPROD_IDR = ? AND HISTORIALPROD_FECHA = ? AND HISTORIALPROD_COMPLETADA = \'S\' AND REGLA_ID = HISTORIALPROD_IDR AND REGLA_ESTADO = \'A\'';
                let results = await connection.query(sql, [regla.REGLA_ID, p_fecha]);
                if (results.length > 0) {
                    reglasCompletadas.push(regla);
                }
            }
            //console.log('Reglas completadas: ' + reglasCompletadas);
            return reglasCompletadas;
        } catch (error) {
            console.error('Error al obtener información de reglas completadas:', error);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async obtener_informacion_reglas_no_completadas(p_fecha) {
        let connection;
        try {
            connection = await pool.getConnection();
            let reglas = await this.obtener_lista_reglas();
            let reglasNoCompletadas = [];
            for (let regla of reglas) {
                let sql = 'SELECT * FROM HISTORIALPROD, REGLA WHERE HISTORIALPROD_IDR = ? AND HISTORIALPROD_FECHA = ? AND HISTORIALPROD_COMPLETADA = \'N\' AND REGLA_ID = HISTORIALPROD_IDR AND REGLA_ESTADO = \'A\'';
                let results = await connection.query(sql, [regla.REGLA_ID, p_fecha]);
                if (results.length > 0) {
                    reglasNoCompletadas.push(regla);
                }
                else {
                    sql = 'SELECT * FROM HISTORIALPROD, REGLA WHERE HISTORIALPROD_IDR = ? AND HISTORIALPROD_FECHA = ?';
                    results = await connection.query(sql, [regla.REGLA_ID, p_fecha]);
                    if (results.length == 0 && regla.REGLA_ESTADO == 'A') {
                          reglasNoCompletadas.push(regla);
                    }
                }
            }
        
            return reglasNoCompletadas;
        } catch (error) {
            console.error('Error al obtener información de reglas no completadas:', error);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

}

class Objetivo {
    constructor() {}

    async crear_objetivo(p_idh, p_fechaini, p_fechafin, p_repeticiones, p_nombre) {
        let sql = 'INSERT INTO OBJETIVO (OBJETIVO_IDH, OBJETIVO_FECHAINI, OBJETIVO_FECHAFIN, OBJETIVO_REPETICIONES, OBJETIVO_NOM) VALUES (?, ?, ?, ?, ?)';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_idh, p_fechaini, p_fechafin, p_repeticiones, p_nombre]);
            console.log('Objetivo creado con ID: ' + results.insertId);
        } catch (err) {
            console.error('Error al crear el objetivo: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async modificar_objetivo(p_id, p_nom,p_idh, p_fechaini, p_fechafin, p_repeticiones) {
        let sql = 'UPDATE OBJETIVO SET OBJETIVO_NOM = ?, OBJETIVO_IDH = ?, OBJETIVO_FECHAINI = ?, OBJETIVO_FECHAFIN = ?, OBJETIVO_REPETICIONES = ? WHERE OBJETIVO_ID = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_nom, p_idh, p_fechaini, p_fechafin, p_repeticiones, p_id]);
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

        let sql = 'SELECT OBJETIVO_ID, OBJETIVO_NOM, HABITO_NOM, OBJETIVO_IDH, OBJETIVO_FECHAINI, OBJETIVO_FECHAFIN, OBJETIVO_REPETICIONES FROM OBJETIVO, HABITO WHERE OBJETIVO_IDH = HABITO_ID';

        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql);
            //console.log('Lista de objetivos: ' + results);
            return results;
        } catch (err) {
            console.error('Error al obtener la lista de objetivos: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async obtener_objetivo_por_id(p_id) {
        let sql = 'SELECT * FROM OBJETIVO WHERE OBJETIVO_ID = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_id]);
            if (results.length > 0) {
                return results[0]; // Devuelve el primer resultado (el objetivo encontrado)
            } else {
                throw new Error('Objetivo no encontrado');
            }
        } catch (err) {
            console.error('Error al obtener el objetivo:', err);
            throw err;
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    
}

class RegistroActividad {
    constructor() {}
    
    async crear_actividad(p_fecha, p_idh, p_cantidad) {

        //Ya existe actividad actualizar el registro
        let sql = 'SELECT * FROM REGACTIVIDAD WHERE REGACTIVIDAD_FECHA = ? AND REGACTIVIDAD_IDH = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_fecha, p_idh]);
            if (results.length > 0) {
                this.modificar_actividad(results[0].REGACTIVIDAD_ID, p_cantidad);
                return;
            }
        } catch (err) {
            console.error('Error al buscar la actividad: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }

        //Si no existe actividad, crearla
        sql = 'INSERT INTO REGACTIVIDAD (REGACTIVIDAD_FECHA, REGACTIVIDAD_IDH, REGACTIVIDAD_CANTIDAD) VALUES (?, ?, ?)';
        connection;
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
            //console.log('Lista de actividades: ' + results[0].REGACTIVIDAD_FECHA + results[0].REGACTIVIDAD_IDH); // results[0].REGACTIVIDAD_FECHA + results[0].REGACTIVIDAD_IDH);
            return results;
        } catch (err) {
            console.error('Error al obtener la lista de actividades: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }       

    async obtener_actividad_por_id(p_idh) {
        let sql = 'SELECT REGACTIVIDAD_ID, REGACTIVIDAD_FECHA, CASE WHEN HABITO.HABITO_IDT = 1 THEN CAST(REGACTIVIDAD_CANTIDAD AS CHAR) WHEN HABITO.HABITO_IDT = 2 THEN CASE WHEN REGACTIVIDAD_CANTIDAD = 1 THEN "Sí" WHEN REGACTIVIDAD_CANTIDAD = 0 THEN "No" END END AS REGACTIVIDAD_CANTIDAD, REGACTIVIDAD_IDH, HABITO_NOM, HABITO_IDT FROM REGACTIVIDAD JOIN HABITO ON REGACTIVIDAD.REGACTIVIDAD_IDH = HABITO.HABITO_ID WHERE REGACTIVIDAD_IDH = ?;';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_idh]);
            console.log('Actividad obtenida con ID: ' + p_idh);
            return results;
        } catch (err) {
            // Si la lista esta vacia, tira error igual
            console.error('Error al obtener la actividad: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

}

class HistorialProductividad {
    
    constructor() {}

    async crear_historial(p_idr, p_fecha, p_completado) {

        //Ya existe historial actualizar el registro
        let sql = 'SELECT * FROM HISTORIALPROD WHERE HISTORIALPROD_IDR = ? AND HISTORIALPROD_FECHA = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_idr, p_fecha]);
            if (results.length > 0) {
                this.modificar_historial(p_idr, p_fecha, p_completado);
                return;
            }
        } catch (err) {
            console.error('Error al buscar el historial de productividad: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }

        sql = 'SELECT * FROM HISTORIALPROD WHERE HISTORIALPROD_IDR = ? AND HISTORIALPROD_FECHA = ?';
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_idr, p_fecha]);
            if (results.length > 0) {
                this.modificar_historial(p_idr, p_fecha, p_completado);
                return;
            }
        } catch (err) {
            console.error('Error al buscar el historial de productividad: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }


        sql = 'INSERT INTO HISTORIALPROD (HISTORIALPROD_FECHA, HISTORIALPROD_COMPLETADA, HISTORIALPROD_IDR) VALUES (?, ?, ?)';
        connection;
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
            //console.log('Lista de historiales de productividad: ' + results);
            return results;
        } catch (err) {
            console.error('Error al obtener la lista de historiales de productividad: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
    
    async visualizar_historial(p_idr, p_fechaini, p_fechafin) {
        let sql = 'SELECT HISTORIALPROD_IDR,HISTORIALPROD_FECHA,CASE WHEN HISTORIALPROD_COMPLETADA = "S" THEN "Sí" WHEN HISTORIALPROD_COMPLETADA = "N" THEN "No" END AS HISTORIALPROD_COMPLETADA FROM HISTORIALPROD WHERE  HISTORIALPROD_IDR = ? AND HISTORIALPROD_FECHA BETWEEN ? AND ?;';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_idr, p_fechaini, p_fechafin]);
            return results;
        } catch (err) {
            console.error('Error al visualizar el historial de productividad: ' + err.stack);
            return [];
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async obtener_cantidad_habitos_por_regla(p_idr) {
        let sql = 'SELECT COUNT(*) AS CANTIDAD FROM REGLAHABITO WHERE REGLAHABITO_IDR = ?';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_idr]);
            return results[0].CANTIDAD;
        } catch (err) {
            console.error('Error al obtener la cantidad de hábitos por regla: ' + err.stack);
            return 0;
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async actualizar_histprod(p_idr, p_fecha) {
        let sql = 'SELECT REGLAHABITO_IDH FROM REGLAHABITO WHERE REGLAHABITO_IDR = ?';
        let connection;
        try {
            connection = await pool.getConnection();

            //ver tipo de regla
            sql = 'SELECT REGLA_TIPO FROM REGLA WHERE REGLA_ID = ?';
            let tipoResults = await connection.query(sql, [p_idr]);
            let tipo = tipoResults[0].REGLA_TIPO;
            
            // Si la regla es obligatoria
            if (tipo == 'OB') {
                console.log('Regla obligatoria');
                sql = 'SELECT REGLAHABITO_IDH FROM REGLAHABITO WHERE REGLAHABITO_IDR = ?';
                let results = await connection.query(sql, [p_idr]);
                let largo_results = results.length;
                let largo_total = await this.obtener_cantidad_habitos_por_regla(p_idr);
                if (largo_results != largo_total) {
                    console.log('Crear con N caso no están todos los habitos: ' + largo_results + ' ' + largo_total);
                    this.crear_historial(p_idr, p_fecha, 'N');
                    return;
                }
                //Ver que todos los hábitos están completados, comparar cantidad con habitocua si son cuantitativos y con 1/0 si son binarios
                for (let habito of results) { 
                    console.log('Hábito: ' + habito.REGLAHABITO_IDH);
                    //obtener tipo de hábito
                    sql = 'SELECT HABITO_IDT FROM HABITO WHERE HABITO_ID = ?';
                    let tipoResultsh = await connection.query(sql, [habito.REGLAHABITO_IDH]);
                    let tipoh = tipoResultsh[0].HABITO_IDT;
                    //Para el caso de cuantitativo, comparar cantidad de habitocua con cantidad de regactividad
                    if (tipoh == 1) {
                        console.log('Hábito cuantitativo' + habito.REGLAHABITO_IDH);
                        sql = 'SELECT HABITOCUA_CANTIDAD, HABITOCUA_TIPOLIM FROM HABITOCUA WHERE HABITOCUA_IDH = ?';
                        let cantidadResults = await connection.query(sql, [habito.REGLAHABITO_IDH]);
                        sql = 'SELECT REGACTIVIDAD_CANTIDAD FROM REGACTIVIDAD WHERE REGACTIVIDAD_IDH = ? AND REGACTIVIDAD_FECHA = ?';
                        let cantidadRegactResults = await connection.query(sql, [habito.REGLAHABITO_IDH, p_fecha]);
                        //ver el tipo de límite
                
                        if ( cantidadRegactResults.length == 0) {
                            console.log('Caso cuantitativo crear con N');
                            this.crear_historial(p_idr, p_fecha, 'N');
                            return;
                        } 

                        let tipolim = cantidadResults[0].HABITOCUA_TIPOLIM;
                        let cantidad = cantidadResults[0].HABITOCUA_CANTIDAD;
                        let cantidadRegact = cantidadRegactResults[0].REGACTIVIDAD_CANTIDAD;

                        //caso menor o igual
                        if (tipolim == '<=') {
                            if (cantidadRegact > cantidad) {
                                console.log('Caso menor o igual crear con N');
                                this.crear_historial(p_idr, p_fecha, 'N');
                                return;
                            }
                        }
                        //caso igual
                        else if (tipolim == '=') {
                            if (cantidadRegact != cantidad) {
                                console.log('Caso igual crear con N');
                                this.crear_historial(p_idr, p_fecha, 'N');
                                return;
                            }
                        }
                        //caso mayor o igual
                        else if (tipolim == '>=') {
                            if (cantidadRegact < cantidad) {
                                console.log('Caso mayor o igual crear con N');
                                this.crear_historial(p_idr, p_fecha, 'N');
                                return;
                            }
                        }
                        // caso mayor
                        else if (tipolim == '>') {
                            if (cantidadRegact <= cantidad) {
                                console.log('Caso mayor crear con N');
                                this.crear_historial(p_idr, p_fecha, 'N');
                                return;
                            }
                        }
                        //caso menor
                        else {
                            if (cantidadRegact >= cantidad) {
                                console.log('Caso menor crear con N');
                                this.crear_historial(p_idr, p_fecha, 'N');
                                return;
                            }
                        }
                    }
                    else {
                        console.log('Hábito binario' + habito.REGLAHABITO_IDH);
                        sql = 'SELECT REGACTIVIDAD_CANTIDAD FROM REGACTIVIDAD WHERE REGACTIVIDAD_IDH = ? AND REGACTIVIDAD_FECHA = ?';
                        let cantidadRegactResults = await connection.query(sql, [habito.REGLAHABITO_IDH, p_fecha]);
                        let cantidadRegact = cantidadRegactResults[0].REGACTIVIDAD_CANTIDAD;
                        if (cantidadRegactResults.length == 0 || cantidadRegact == 0) {
                            console.log('Caso binario crear con N');
                            this.crear_historial(p_idr, p_fecha, 'N');
                            return;
                        }
                    }
                }
                console.log('Crear con S');
                this.crear_historial(p_idr, p_fecha, 'S');
            }
            //tipo regla opcional
            else {
                console.log('Regla opcional');
                sql = 'SELECT REGLAHABITO_IDH FROM REGLAHABITO WHERE REGLAHABITO_IDR = ?';
                let results = await connection.query(sql, [p_idr]);
                let largo_results = results.length;
                if (largo_results == 0) {
                    this.crear_historial(p_idr, p_fecha, 'N');
                    return;
                }
                for (let habito of results) {
                    sql = 'SELECT HABITO_IDT FROM HABITO WHERE HABITO_ID = ?';
                    let tipoResultsh = await connection.query(sql, [habito.REGLAHABITO_IDH]);
                    let tipoh = tipoResultsh[0].HABITO_IDT;
                    console.log('Hábito: ' + habito.REGLAHABITO_IDH + ' Tipo: ' + tipoh);
                    //Para el caso de cuantitativo, comparar cantidad de habitocua con cantidad de regactividad
                    if (tipoh == 1) {
                        console.log('Hábito cuantitativo');

                        sql = 'SELECT HABITOCUA_CANTIDAD, HABITOCUA_TIPOLIM FROM HABITOCUA WHERE HABITOCUA_IDH = ?';
                        let cantidadResults = await connection.query(sql, [habito.REGLAHABITO_IDH]);
                        sql = 'SELECT REGACTIVIDAD_CANTIDAD FROM REGACTIVIDAD WHERE REGACTIVIDAD_IDH = ? AND REGACTIVIDAD_FECHA = ?';
                        let cantidadRegactResults = await connection.query(sql, [habito.REGLAHABITO_IDH, p_fecha]);
                        //ver el tipo de 
                        if (cantidadRegactResults.length == 0) {
                            //this.crear_historial(p_idr, p_fecha, 'N');
                            continue;
                        }
                        let tipolim = cantidadResults[0].HABITOCUA_TIPOLIM;
                        let cantidad = cantidadResults[0].HABITOCUA_CANTIDAD;
                        let cantidadRegact = cantidadRegactResults[0].REGACTIVIDAD_CANTIDAD;

                        //caso menor o igual
                        if (tipolim == '<=') {
                            if (cantidadRegact <= cantidad) {
                                this.crear_historial(p_idr, p_fecha, 'S');
                                return;
                            }
                        }
                        //caso igual
                        else if (tipolim == '=') {
                            if (cantidadRegact == cantidad) {
                                this.crear_historial(p_idr, p_fecha, 'S');
                                return;
                            }
                        }
                        //caso mayor o igual
                        else if (tipolim == '>=') {
                            if (cantidadRegact >= cantidad) {
                                this.crear_historial(p_idr, p_fecha, 'S');
                                return;
                            }
                        }
                        // caso mayor
                        else if (tipolim == '>') {
                            if (cantidadRegact > cantidad) {
                                this.crear_historial(p_idr, p_fecha, 'S');
                                return;
                            }
                        }
                        //caso menor
                        else {
                            if (cantidadRegact < cantidad) {
                                this.crear_historial(p_idr, p_fecha, 'S');
                                return;
                            }
                        }
                    }
                    else {
                        sql = 'SELECT REGACTIVIDAD_CANTIDAD FROM REGACTIVIDAD WHERE REGACTIVIDAD_IDH = ? AND REGACTIVIDAD_FECHA = ?';
                        let cantidadRegactResults = await connection.query(sql, [habito.REGLAHABITO_IDH, p_fecha]);
                        let cantidadRegact = cantidadRegactResults[0].REGACTIVIDAD_CANTIDAD;
                        if (cantidadRegactResults.length > 0 && cantidadRegact == 1) {
                            this.crear_historial(p_idr, p_fecha, 'S');
                            return;
                        }   
                    }
                }
                this.crear_historial(p_idr, p_fecha, 'N');
            }
        } catch (err) {
            console.error('Error al actualizar el historial de productividad: ' + err.stack);
            return false;
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }

    async actualizar_histprod_por_habito(p_idh, p_fecha) {
        let sql = 'SELECT REGLAHABITO_IDR FROM REGLAHABITO, REGLA WHERE REGLAHABITO_IDH = ? AND REGLAHABITO_IDR = REGLA_ID AND REGLA_ESTADO = \'A\'';
        let connection;
        try {
            connection = await pool.getConnection();
            let results = await connection.query(sql, [p_idh]);
            for (let regla of results) {
                this.actualizar_histprod(regla.REGLAHABITO_IDR, p_fecha);
            }
        } catch (err) {
            console.error('Error al actualizar el historial de productividad por hábito: ' + err.stack);
        } finally {
            if (connection) connection.release(); // Liberar la conexión al pool
        }
    }
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

const fs = require('fs');
const path = require('path');

const databaseName = 'ponteelhabito';

class Modelo {

    constructor() {
        this.habito = new Habito();
        this.regla = new Regla();
        this.objetivo = new Objetivo();
        this.regact = new RegistroActividad();
        this.histprod = new HistorialProductividad();
    }

    // Importar y exportar base de datos
    async importar_datos(baseDeDatosCompleta) {
        let connection;
        try {
            connection = await pool.getConnection();
            await connection.query("SET FOREIGN_KEY_CHECKS=0");
    
            for (const tableName in baseDeDatosCompleta) {
                const rows = baseDeDatosCompleta[tableName];
                await connection.query(`TRUNCATE TABLE ${tableName}`);
    
                for (const row of rows) {
                    const columns = Object.keys(row).join(', ');
                    const values = Object.values(row).map(value => {
                        if (typeof value === 'string' && !isNaN(Date.parse(value))) {
                            return `'${formatDate(value)}'`;
                        }
                        return `'${value}'`;
                    }).join(', ');
    
                    const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
                    await connection.query(query);
                }
            }
    
            await connection.query("SET FOREIGN_KEY_CHECKS=1");
            console.log('Base de datos importada exitosamente');
    
        } catch (error) {
            console.error('Error al importar la base de datos:', error);
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
    
   
    async  exportar_datos() {
        let connection;
        try {
            connection = await pool.getConnection();
            const tables = await connection.query("SHOW TABLES");

            let baseDeDatosCompleta = {};

            for (const tableObj of tables) {
                const tableName = tableObj[`Tables_in_${databaseName}`];
                const rows = await connection.query(`SELECT * FROM ${tableName}`);
                baseDeDatosCompleta[tableName] = rows;
            }

            const jsonData = JSON.stringify(baseDeDatosCompleta, null, 2);
            const directoryPath = path.join(__dirname, '../../downloads');
            const filePath = path.join(directoryPath, 'base_de_datos.json');

            // Verifica si el directorio existe, si no, lo crea
            if (!fs.existsSync(directoryPath)) {
                fs.mkdirSync(directoryPath, { recursive: true });
            }

            fs.writeFileSync(filePath, jsonData);
            return filePath;

        } catch (error) {
            console.error('Error al exportar la base de datos:', error);
            throw error;
        } finally {
            if (connection) {
                connection.release();
            }
        }
    }
}

module.exports = new Modelo()

