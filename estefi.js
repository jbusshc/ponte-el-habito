const fs = require('fs');
const mariadb = require('mariadb');

// Crear un pool de conexiones
const pool = mariadb.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: '123',
    database: 'ponteelhabito',
    connectionLimit: 5
});

const databaseName = 'ponteelhabito';

// Función para formatear fechas en formato ISO a 'YYYY-MM-DD HH:MM:SS'
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

async function exportarBaseDeDatos() {
    let connection;
    try {
        connection = await pool.getConnection();
        console.log('Conectado a la base de datos de MariaDB');

        const tables = await connection.query("SHOW TABLES");
        let baseDeDatosCompleta = {};

        for (const tableObj of tables) {
            const tableName = tableObj[`Tables_in_${databaseName}`];
            const rows = await connection.query(`SELECT * FROM ${tableName}`);
            baseDeDatosCompleta[tableName] = rows;
        }

        const jsonData = JSON.stringify(baseDeDatosCompleta, null, 2);
        fs.writeFileSync('base_de_datos.json', jsonData);
        console.log('Base de datos exportada exitosamente a base_de_datos.json');

    } catch (error) {
        console.error('Error al exportar la base de datos:', error);
    } finally {
        if (connection) {
            connection.release();
        }
        await pool.end();
    }
}

async function importarBaseDeDatos() {
    let connection;
    try {
        const jsonData = fs.readFileSync('base_de_datos.json', 'utf8');
        const baseDeDatosCompleta = JSON.parse(jsonData);

        connection = await pool.getConnection();
        console.log('Conectado a la base de datos de MariaDB para importar');

        await connection.query("SET FOREIGN_KEY_CHECKS=0");

        for (const tableName in baseDeDatosCompleta) {
            const rows = baseDeDatosCompleta[tableName];
            await connection.query(`TRUNCATE TABLE ${tableName}`);

            for (const row of rows) {
                const columns = Object.keys(row).join(', ');
                const values = Object.values(row).map(value => {
                    if (typeof value === 'string' && !isNaN(Date.parse(value))) {
                        // Convertir fechas en formato ISO al formato adecuado
                        return `'${formatDate(value)}'`;
                    }
                    return `'${value}'`;
                }).join(', ');

                const query = `INSERT INTO ${tableName} (${columns}) VALUES (${values})`;
                await connection.query(query);
            }
        }

        await connection.query("SET FOREIGN_KEY_CHECKS=1");
        console.log('Base de datos importada exitosamente desde base_de_datos.json');

    } catch (error) {
        console.error('Error al importar la base de datos:', error);
    } finally {
        if (connection) {
            connection.release();
        }
        await pool.end();
    }
}

// Ejecutar la función para importar la base de datos
importarBaseDeDatos();
