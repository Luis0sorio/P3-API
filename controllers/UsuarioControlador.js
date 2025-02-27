
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

// Funcion para verificar el login de usuario
const verificarLogin = async (req, res) => {
  try {
    // Extraemos los datos del formulario de login
    const {usuario, password} = req.body;

    // Verificamos que tengan valores
    if (!usuario || !password) {
      return res.status(400).json({ mensaje: "Usuario y contraseña son obligatorios" });
    }

    // Verificamos si el usuario o la password existen en la base de datos
    const verificarUsuario = await Usuario.findOne({ usuario });
    if (!verificarUsuario) {
      return res.status(400).json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    const verificarPassword = await bcrypt.compare(password, verificarUsuario.password);
    if (!verificarPassword) {
      return res.status(400).json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    res.status(200).json({ mensaje: "Éxito al iniciar sesión"});
    
  } catch (error) {
    console.error("Error en el inicio de sesión: ", error);
  }
}

// Funcion que obtiene los datos del usuario logeado 
const obtenerDatosUsuario = async (req, res) => {
  try {
    // Recuperamos el usuario de la solicitud
    const usuario = req.params.usuario;
    // Busca en la base de datos un usuario con el nombre proporcionado
    const usuarioExiste = await Usuario.findOne({usuario});
    // Si no existe, mostramos un mensaje de error
    if (!usuarioExiste) {
      return res.status(404).json({mensaje : "Usuario no encontrado."});
    }
    // Si existe, devuelve la información
    res.status(200).json({
      usuario: usuarioExiste.usuario,
      email: usuarioExiste.email,
    });
  } catch (error) {
    console.error("Error al obtener los datos del usuario:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
}

// Función para modificar los datos de un usuario
const modificarUsuario = async (req, res) => {
  try {
    // Extrae los datos del formulario
    const { usuario, email, password } = req.body;

    // Verifica que los campos usuario y email tengan valores
    if (!usuario || !email) {
      return res.status(400).json({ mensaje: "Usuario y email son obligatorios" });
    }

    // Busca en la base de datos el usuario
    const usuarioExiste = await Usuario.findOne({ usuario });

    // Si el usuario no existe, muestra un mensaje de error
    if (!usuarioExiste) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Actualiza el email del usuario
    usuarioExiste.email = email;

    // Para la nueva contraseña, también se encripta
    if (password) {
      const passwordHash = await bcrypt.hash(password, 10);
      usuarioExiste.password = passwordHash;
    }

    // Guarda los cambios en la base de datos
    await usuarioExiste.save();

    // Responde con un mensaje de éxito
    res.status(200).json({ mensaje: "Perfil actualizado con éxito" });

  } catch (error) {
    console.error("Error al modificar el usuario.", error);
    res.status(500).json({ mensaje: "Error del servidor." });
  }
};


// Exportamos las funciones para ser utilizadas en otros archivos del proyecto:
module.exports = {
  addNuevoUsuario,
  verificarLogin,
  obtenerDatosUsuario,
  modificarUsuario,
};
