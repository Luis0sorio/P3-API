const express = require('express');
const rutasA = express.Router();
const AuthController = require('../controllers/AutenticarControlador');

// Ruta para cerrar sesión
rutasA.post('/logout', AuthController.logout);

module.exports = rutasA;