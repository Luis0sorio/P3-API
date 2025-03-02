const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const TokenControlador = require('./TokenControlador.js');
require('dotenv').config();

const SECRETO = process.env.SECRETO;

// Función para cerrar sesión
const logout = async (req, res) => {
  const token = req.cookies.access_token; // Obtener el token de la cookie

  if (!token) {
    return res.status(400).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    // Verificar si el token ya está en la lista negra
    if (await TokenControlador.esTokenInvalido(token)) {
      return res.status(400).json({ mensaje: 'El Token ya está invalidado' });
    }

    // Decodificar el token para obtener la fecha de expiración
    let decoded;
    try {
      decoded = jwt.verify(token, SECRETO);
    } catch (error) {
      console.error('Token inválido o expirado:', error);
      return res.status(400).json({ mensaje: 'Token inválido o expirado' });
    }

    const expiracion = new Date(decoded.exp * 1000);

    // Agregar el token a la lista negra
    await TokenControlador.agregarToken(token, expiracion);

    // Eliminamos la cookie
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'strict',
    });
    console.log('Cookie eliminada:', req.cookies.access_token);
    res.status(200).json({ mensaje: 'Sesión cerrada correctamente' });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
};

module.exports = {
  logout,
};