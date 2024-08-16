const express = require('express');
const path = require('path');
const app = express();

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const landingRoutes = require('./src/routes/Landing');
const gestorReglasRoutes = require('./src/routes/GestorReglas');
const gestorHabitosRoutes = require('./src/routes/GestorHabitos');
const crearHabitoRoutes = require('./src/routes/CrearHabito');
const modificarHabitosRoutes = require('./src/routes/ModificarHabito')
// Usar Rutas
app.use('/', landingRoutes);
app.use('/', gestorReglasRoutes);
app.use('/', gestorHabitosRoutes);
app.use('/', crearHabitoRoutes);
app.use('/', modificarHabitosRoutes);


// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
