
const express = require('express');
const controladorUsuario = require('../controllers/UsuarioControlador.js');

// Para poder manejar la API creamos un objeto que permite definir rutas con express
const rutas = express.Router();

// Esta ruta acepta peticiones de tipo POST
// llamamos a la función que maneja la lógica de inserción
rutas.post('/insercionUsuario', controladorUsuario.addNuevoUsuario);

module.exports = rutas;