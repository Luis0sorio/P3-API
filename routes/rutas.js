
const express = require('express');
const controladorUsuario = require('../controllers/UsuarioControlador.js');
const controladorFavorito = require('../controllers/FavoritoControlador.js');
const controladorAutenticar = require('../controllers/AutenticarControlador.js');

const verificarToken = require('../middleware/MiddlewareAutenticar.js'); // Importar el middleware

// Para poder manejar la API creamos un objeto que permite definir rutas con express
const rutas = express.Router();

// rutas para la navegación de un usuario verificado
rutas.post('/insercionUsuario', controladorUsuario.addNuevoUsuario);
rutas.post('/login', controladorUsuario.verificarLogin);
rutas.put('/usuario', verificarToken, controladorUsuario.modificarUsuario);

// rutas para los favoritos del usuario
rutas.post('/favoritos', verificarToken, controladorFavorito.añadirFavorito);
rutas.get('/listaFavoritos', verificarToken, controladorFavorito.listaFavoritos);
rutas.delete('/borrarFavoritos/:eventoId', verificarToken, controladorFavorito.eliminarFavorito);

// ruta para el cierre de sesión
rutas.post('/logout', controladorAutenticar.logout);

// exportamos las rutas
module.exports = rutas;
