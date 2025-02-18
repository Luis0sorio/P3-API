
// Importamos el modelo de usuario
const Usuario = require('../models/Usuario.js');
// Importamos la libreria para hashear contraseñas
const bcrypt = require('bcrypt');

// Definimos cuantas veces aplicar el algoritmo de encriptacion
const saltRounds = 10;

// Función para insertar un nuevo usuario en la base de datos
const addNuevoUsuario = async (req, res) => {
  try {
    // Extraemos los datos del formulario
    const { nombre, apellido1, apellido2, pais, ciudad, email, usuario, password } = req.body;

    // Verificamos que los campos obligatorios tengan valores
    if (!nombre || !apellido1 || !pais || !ciudad || !email || !usuario || !password) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios" });
    }

    // Verificamos si el email o el usuario ya existen en la base de datos
    const usuarioExistente = await Usuario.findOne({ $or: [{ email }, { usuario }] });

    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El email o el usuario ya están registrados" });
    }

    // Hasheamos la contraseña
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Creamos un nuevo usuario con los datos recibidos
    const nuevoUsuario = new Usuario({
      nombre,
      apellido1,
      apellido2: apellido2 || '',
      pais,
      ciudad,
      email,
      usuario,
      password: passwordHash, 
    });

    // Guardamos el usuario en la base de datos
    await nuevoUsuario.save();

    // Respondemos con un mensaje de éxito
    res.status(201).json({ mensaje: "Usuario registrado con éxito."});

  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Exportamos la función para ser utilizada en otros archivos del proyecto
module.exports = {addNuevoUsuario};
