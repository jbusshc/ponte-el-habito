const mysql = require('mysql2');

// Crear la conexión a la base de datos
const connection = mysql.createConnection({
    host: '127.0.0.1',           // Cambia esto según la configuración de tu base de datos
    user: 'root',          // Reemplaza con tu nombre de usuario de MySQL
    password: '123',   // Reemplaza con tu contraseña de MySQL
    database: 'ponteelhabito'  // Reemplaza con el nombre de tu base de datos
});

// Conectar a la base de datos
connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos con ID:', connection.threadId);
});

module.exports = connection;