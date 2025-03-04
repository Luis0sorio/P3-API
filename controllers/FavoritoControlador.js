
const Usuario = require('../models/Usuario.js');


// Función que añade un evento a los favoritos del usuario
const añadirFavorito = async (req, res) => {

  try {
    const usuarioId  = req.usuario.id;
    const evento = req.body;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({mensaje: 'Usuario no encontrado.' });
    }

    // Verificamos que el evento ya está añadido
    // el método find() recorre el array de favoritos y compara si el id es igual al del evento
    const eventoExiste = usuario.favoritos.find((fav) => fav._id.toString() === evento._id.toString());
    if (eventoExiste) {
      return res.status(400).json({ mensaje: "El evento ya está en favoritos." });
    }

    // Añadimos un evento a favoritos
    usuario.favoritos.push(evento);
    await usuario.save();
    res.status(200).json({ mensaje: 'Evento añadido a favoritos', favoritos: usuario.favoritos });

  } catch (error) {
    console.error('Error al añadir evento a favoritos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

// Función que eliminar un evento de los favoritos
const eliminarFavorito = async (req, res) => {
  try { 
    const { usuarioId, eventoId } = req.params;

    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    // se genera una copia del array sin el evento a eliminar. Mejora la eficiencia.
    usuario.favoritos = usuario.favoritos.filter((fav) => fav._id.toString() !== eventoId);
    await usuario.save();

    res.status(200).json({ mensaje: 'Evento eliminado de favoritos', favoritos: usuario.favoritos });
  
  } catch (error) {
    console.error('Error al eliminar evento de favoritos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

// Función para obtener la lista de favoritos del usuario
const listaFavoritos = async (req, res) => {
  try {
    const usuarioId  = req.usuario.id;
    //const usuarioId  = req.params.usuarioId;

    // Buscar el usuario y obtener sus favoritos
    const usuario = await Usuario.findById(usuarioId);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.status(200).json({ favoritos: usuario.favoritos });
    
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    res.status(500).json({ mensaje: 'Error interno del servidor' });
  }
}

module.exports = {
  añadirFavorito,
  eliminarFavorito,
  listaFavoritos,
};