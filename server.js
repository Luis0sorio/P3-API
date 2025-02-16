import 'dotenv/config';
import express from 'express';
import conexionDB from './config/database.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';  // Asegúrate de agregar esta línea

const PORT = process.env.PORT || 3000;
const app = express();

// Obtén el directorio actual usando `import.meta.url`
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Redirigir la raíz al archivo de login
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'login', 'login.html'));
});

app.get('/registro/registro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'registro', 'registro.html'));
});

app.get('/login/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'views', 'login', 'login.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

conexionDB();
