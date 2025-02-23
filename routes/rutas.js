
const express = require('express');
const controladorUsuario = require('../controllers/UsuarioControlador.js');

// Para poder manejar la API creamos un objeto que permite definir rutas con express
const rutas = express.Router();

// Esta ruta acepta peticiones de tipo POST
// llamamos a la función que maneja la lógica de inserción
rutas.post('/insercionUsuario', controladorUsuario.addNuevoUsuario);
// llamamos a la funcion que maneja la validacion de inicio de sesión
rutas.post('/login', controladorUsuario.verificarLogin);
// usamos una ruta parametrizada y llamamos a la funcion correspondiente
rutas.get('usuario/:usuario', controladorUsuario.obtenerDatosUsuario);
// modificamos los datos del usuario
rutas.put('', controladorUsuario.modificarUsuario);

module.exports = rutas;
