
// Importamos el modelo de usuario
const Usuario = require('../models/Usuario.js');
// Importamos la libreria para hashear contraseñas
const bcrypt = require('bcrypt');
// Importamos la libreria JWT
const jwt = require('jsonwebtoken');
require('dotenv').config();

const SECRETO = process.env.SECRETO;

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
    const { usuario, password } = req.body;

    // Verificamos que tengan valores
    if (!usuario || !password) {
      return res.status(400).json({ mensaje: "Usuario y contraseña son obligatorios" });
    }

    // Verificamos si el usuario existe en la base de datos
    const verificarUsuario = await Usuario.findOne({ usuario });
    if (!verificarUsuario) {
      return res.status(400).json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    // Verificamos si la contraseña es correcta
    const verificarPassword = await bcrypt.compare(password, verificarUsuario.password);
    if (!verificarPassword) {
      return res.status(400).json({ mensaje: "Usuario o contraseña incorrectos" });
    }

    // Implementamos el token JWT
    const token = jwt.sign(
      { id: verificarUsuario._id, usuario: verificarUsuario.usuario },
      SECRETO,
      { expiresIn: '1h' }
    );

    // Enviamos el token en una cookie
    res.cookie('access_token', token, {
      httpOnly: true, // cookie solo accesible en el servidor
      secure: process.env.NODE_ENV === 'production', // Se envía la cookie por https en producción
      sameSite: 'strict', // cookie accesible en el mismo dominio
      maxAge: 3600000 // validez de la cookie (1h)
    });

    
    // Devolvemos todos los datos del usuario (excepto la contraseña)
    let datosUsuario = {
      id: verificarUsuario._id,
      nombre: verificarUsuario.nombre,
      ciudad: verificarUsuario.ciudad,
      usuario: verificarUsuario.usuario,
      email: verificarUsuario.email,
    };
  
    return res.status(200).json({
      mensaje: "Éxito al iniciar sesión",
      token,
      datos: datosUsuario, // Devolvemos todos los datos del usuario
    });

  } catch (error) {
    console.error("Error en el inicio de sesión: ", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// Función para modificar los datos de un usuario
const modificarUsuario = async (req, res) => {
  try {
    // Extrae los datos del formulario
    const { usuarioForm, usuario, email, password } = req.body;

    // Verifica que al menos un campo tenga un valor
    if (!usuario && !email && !password) {
      return res.status(400).json({ mensaje: "Complete el campo que desea modificar" });
    }

    // Busca en la base de datos el usuario
    const usuarioExiste = await Usuario.findOne({ usuario: usuarioForm }); // Asegúrate de enviar el usuario original desde el frontend

    // Si el usuario no existe, muestra un mensaje de error
    if (!usuarioExiste) {
      return res.status(404).json({ mensaje: "Usuario no encontrado" });
    }

    // Actualiza el usuario si se proporciona un nuevo valor
    if (usuario) {
      // Verifica si el nuevo usuario ya existe
      const usuarioNuevoExiste = await Usuario.findOne({ usuario });
      if (usuarioNuevoExiste) {
        return res.status(400).json({ mensaje: "El nombre de usuario no está disponible." });
      }
      usuarioExiste.usuario = usuario;
    }

    // Actualiza el email si se proporciona un nuevo valor
    if (email) {
      // Verifica si el nuevo email ya existe
      const emailExiste = await Usuario.findOne({ email });
      if (emailExiste && emailExiste.usuario !== usuarioExiste.usuario) {
        return res.status(400).json({ mensaje: "Este email ya ha sido registrado." });
      }
      usuarioExiste.email = email;
    }

    // Actualiza la contraseña si se proporciona un nuevo valor
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
  modificarUsuario,
};
