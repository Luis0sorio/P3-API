require('dotenv').config(); // Configura dotenv
const express = require('express'); // Importa Express
const path =require('path'); // Importa path para manejar rutas de archivos
const conexionDB = require('./config/database.js'); // Importa la función de conexión a la base de datos
const rutas = require('./routes/rutas.js') ; // Importa las rutas
const cookieParser = require('cookie-parser'); // Importa cookie-parser

const PORT = process.env.PORT; // Obtiene el puerto desde las variables de entorno
const app = express(); // Crea una instancia de Express

// Middlewares
app.use(express.json()); // Para analizar solicitudes en formato JSON
app.use(cookieParser()); 

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(process.cwd(), 'public')));

// Usa las rutas definidas en './routes/rutas.js' bajo el prefijo '/api'
app.use('/api', rutas);

// Redirigir la raíz al archivo de login
app.get('/', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'views', 'login', 'login.html'));
});

// Redirigir al formulario de registro
app.get('/registro/registro.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'views', 'registro', 'registro.html'));
});

// Redirigir al login
app.get('/login/login.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'views', 'login', 'login.html'));
});

// Redirigir al index (principal) después del login exitoso
app.get('/principal/index.html', (req, res) => {
  res.sendFile(path.join(process.cwd(), 'public', 'views', 'principal', 'index.html'));
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Conectar a la base de datos
conexionDB();
