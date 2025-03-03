
// Importamos la dependecia para mapear nuestras colecciones
const mongoose = require('mongoose');
// Utilizo la clase de la libreria para mapear colecciones
const {Schema} = mongoose;

// Defino los atributos de la colección
const usuarioSchema = new Schema({
  nombre: { type: String, required: true },
  apellido1: { type: String, required: true }, 
  apellido2: { type: String, required: false }, 
  pais: { type: String, required: true },
  ciudad: { type: String, required: true },
  email: { type: String, required: true, unique: true }, // Único para evitar duplicados
  usuario: { type: String, required: true, unique: true }, // Único para evitar duplicados
  password: { type: String, required: true },
  // Lista de eventos favoritos. Array de objetos (favoritos)
  favoritos: [
    {
      id: String,// id del evento
      name: String, // nombre del evento
      dates: {
        start: {
          localDate: String, // fecha evento
          localTime: String, // hora evento
        },
      },
      _embebed: { // informacion adicional
        venues: [
          {
            name: String, // ubicación
            city: { name: String }, // ciudad
            country: { name: String }, // país
          },
        ],
      },
      url: String, // enlace entradas
      imagen: String, // imagen del evento
    },
  ],
});

// Creo el modelo para los usuarios
const Usuario = mongoose.model("Usuario", usuarioSchema);

// Exportamos el modelo
module.exports = Usuario;