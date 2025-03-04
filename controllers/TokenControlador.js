
const Token = require('../models/Token.js');

// Función para registrar un token en la lista negra
const  agregarToken = async (token, expiracion) => {
  try {
    console.log("Guardando el token...", token);
    const blackToken = new Token({ token, expiracion });
    await blackToken.save();
    console.log('Token agregado a la lista negra.', token);
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

module.exports = {
  agregarToken,
  esTokenInvalido,
};