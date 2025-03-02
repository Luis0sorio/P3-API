const jwt = require('jsonwebtoken');
const TokenControlador = require('../controllers/TokenControlador');
require('dotenv').config();

const SECRETO = process.env.SECRETO;

const verificarToken = async (req, res, next) => {
  const token = req.cookies.token; // Obtener el token de la cookie

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    // Verificamos si el token está en la lista negra
    if (await TokenControlador.esTokenInvalido(token)) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }

    // Verificamos el token
    const decoded = jwt.verify(token, SECRETO);
    req.usuario = decoded; // Adjuntar los datos del usuario al request
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

module.exports = verificarToken;