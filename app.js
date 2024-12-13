const express = require('express');
const path = require('path');
const app = express();

// Configurar el middleware para manejar JSON en las solicitudes
app.use(express.json());

// Configurar el motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
const paginaInicioRoutes = require('./src/routes/paginaInicio');

const gestorHabitoRoutes = require('./src/routes/gestorHabito');
const crearHabitoRoutes = require('./src/routes/crearHabito');
const modificarHabitoRoutes = require('./src/routes/modificarHabito');
const eliminarHabitoRoutes = require('./src/routes/eliminarHabito');

const gestorReglaRoutes = require('./src/routes/gestorRegla');
const crearReglaRoutes = require('./src/routes/crearRegla');
const modificarReglaRoutes = require('./src/routes/modificarRegla');
const eliminarReglaRoutes = require('./src/routes/eliminarRegla');

const gestorObjetivoRoutes = require('./src/routes/gestorObjetivo');
const crearObjetivoRoutes = require('./src/routes/crearObjetivo');
const modificarObjetivoRoutes = require('./src/routes/modificarObjetivo');
const eliminarObjetivoRoutes = require('./src/routes/eliminarObjetivo');

const historialHabitoRoutes = require('./src/routes/historialHabito');
const historialProductividadRoutes = require('./src/routes/historialProductividad');

const registrarActividadRoutes = require('./src/routes/registrarActividad');  // Añade esta línea

const exportarImportarRoutes = require('./src/routes/exportarImportar');



app.use('/', paginaInicioRoutes);
app.use('/', gestorHabitoRoutes);
app.use('/', crearHabitoRoutes);
app.use('/', modificarHabitoRoutes);
app.use('/', eliminarHabitoRoutes);

app.use('/', gestorReglaRoutes);
app.use('/', crearReglaRoutes);
app.use('/', modificarReglaRoutes);
app.use('/', eliminarReglaRoutes);

app.use('/', gestorObjetivoRoutes);
app.use('/', crearObjetivoRoutes);
app.use('/', modificarObjetivoRoutes);
app.use('/', eliminarObjetivoRoutes);

app.use('/', historialHabitoRoutes);
app.use('/', historialProductividadRoutes);

app.use('/', registrarActividadRoutes);  

app.use('/', exportarImportarRoutes);

app.use((req, res, next) => {
    res.status(404).render('404', { titulo: 'Página No Encontrada' });
});

// Iniciar el servidor en el puerto 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
