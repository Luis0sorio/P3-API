const jwt = require('jsonwebtoken');
const TokenControlador = require('../controllers/TokenControlador');
require('dotenv').config();

const SECRETO = process.env.SECRETO;

const verificarToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Obtener el token del header

  if (!token) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' });
  }

  try {
    // Verificar si el token está en la lista negra
    if (await TokenControlador.esTokenInvalido(token)) {
      return res.status(401).json({ mensaje: 'Token inválido' });
    }

    // Verificar el token JWT
    const decoded = jwt.verify(token, SECRETO);
    req.usuario = decoded; // Adjuntar los datos del usuario al request
    next();
  } catch (error) {
    console.error('Error al verificar el token:', error);
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};

module.exports = verificarToken;