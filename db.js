const mariadb = require('mariadb');

// Crear un pool de conexiones
const pool = mariadb.createPool({
    host: 'localhost',       // Host de la base de datos
    user: 'root',    // Usuario de la base de datos
    password: '', // Contraseña de la base de datos
    database: 'ponteelhabito', // Nombre de la base de datos
    connectionLimit: 5       // Número máximo de conexiones en el pool
});

// Exportar el pool para usarlo en otros módulos
module.exports = pool;
