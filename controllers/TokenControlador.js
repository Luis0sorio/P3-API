
const jwt = require('jsonwebtoken');
const Token = require('../models/Token');
const Usuario = require('../models/Usuario');
require('dotenv').config();

const SECRETO = process.env.SECRETO;

// Función para registrar un token en la lista negra
const  agregarToken = async (token, expiracion) => {
  try {
    console.log("Intentando guardar el token:", token);
    const tokenInvalido = new Token({ token, expiracion });
    await tokenInvalido.save();
    console.log('Token agregado a la lista negra.');
  } catch (error) {
    console.error('Error al agregar token a la lista negra:', error);
    throw error;
  }
}

// Función para verificar si un token está en la lista negra
const esTokenInvalido = async (token) => {
  try {
    const tokenInvalido = await Token.findOne({ token });
    return !!tokenInvalido; // Devuelve true si el token está en la lista negra
  } catch (error) {
    console.error('Error al verificar token en la lista negra:', error);
    throw error;
  }
}
/*
// Función para eliminar un token de la lista negra
const eliminarToken = async (token) => {
  try {
    await Token.deleteOne({ token });
    console.log('Token eliminado de la lista negra:', token);
  } catch (error) {
    console.error('Error al eliminar token de la lista negra:', error);
    throw error;
  }
};
*/
module.exports = {
  agregarToken,
  esTokenInvalido,
  //eliminarToken,
};