
const express = require('express');
const controladorUsuario = require('../controllers/UsuarioControlador.js');
const controladorFavorito = require('../controllers/FavoritoControlador.js');

const verificarToken = require('../middleware/MiddlewareAutenticar.js'); // Importar el middleware

// Para poder manejar la API creamos un objeto que permite definir rutas con express
const rutas = express.Router();

// llamamos a la función que maneja la lógica de inserción
rutas.post('/insercionUsuario', controladorUsuario.addNuevoUsuario);
// llamamos a la funcion que maneja la validacion de inicio de sesión
rutas.post('/login', controladorUsuario.verificarLogin);
// usamos una ruta parametrizada y llamamos a la funcion correspondiente
//rutas.get('/usuario/:id', verificarToken, controladorUsuario.obtenerDatosUsuario);
// modificamos los datos del usuario
rutas.put('/usuario', verificarToken, controladorUsuario.modificarUsuario);

// rutas para los favoritos del usuario
rutas.post('/', verificarToken, controladorFavorito.añadirFavorito);
rutas.get('/', verificarToken, controladorFavorito.listaFavoritos);
rutas.delete('/', verificarToken, controladorFavorito.eliminarFavorito);

// exportamos las rutas
module.exports = rutas;
