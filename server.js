// Improtamos las dependencias
require('dotenv').config();
const express = require('express');
const path = require('path');
const conexionDB = require('./config/database.js');
const rutas = require('./routes/rutas.js');

const PORT = process.env.PORT;
const app = express();
app.use(express.json());

// Implementacion de middlewares
// Funciones que permiten analizar, validar, registrar y modificar solicitudes
/**
 * Para analizar application/json -> solicitudes en formato json. Se cxonvierte en un objeto JS
 * app.use(express.json()); 
 * Para analizar application/x-www-form-urlencoded -> solicitudes HTML. Formularios.
 * app.use(express.urlencoded({ extended: true }));
 */


// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));
// 
app.use('/api', rutas);

// Redirigir la raíz al archivo de login cuando se ejecuta la aplicación
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'login', 'login.html'));
});
// Desde el login, se accede al formulario de registro
app.get('/registro/registro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'registro', 'registro.html'));
});
// Del mismo modo, el botón 'atrás' redirecciona al login
app.get('/login/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'login', 'login.html'));
});
// La aplicación carga el index (principal) después del login exitoso
app.get('/principal/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'principal', 'index.html'));
});

// La consola muestra información del puerto en el que escucha la aplicación
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
// Llamada a la conexión con la base de datos
conexionDB();
