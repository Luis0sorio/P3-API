const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const TokenControlador = require('./TokenControlador');
require('dotenv').config();

const SECRETO = process.env.SECRETO;

// Función para cerrar sesión
const logout = async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header

  if (!token) {
    return res.status(400).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    // Verificar si el token ya está en la lista negra
    if (await TokenControlador.esTokenInvalido(token)) {
      return res.status(400).json({ mensaje: 'El Token ya está invalidado' });
    }

    // Decodificar el token para obtener la fecha de expiración
    const decoded = jwt.verify(token, SECRETO);
    const expiracion = new Date(decoded.exp * 1000); // Convertir a fecha

    // Agregar el token a la lista negra
    await TokenControlador.agregarToken(token, expiracion);

    res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  logout,
};