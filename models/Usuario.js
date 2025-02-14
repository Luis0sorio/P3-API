
// Importamos la dependecia para mapear nuestras colecciones
import mongoose from 'mongoose';

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
  password: { type: String, required: true }, // Debemos hashearla
});

// Creo el modelo para los usuarios
const Usuario = mongoose.model("Usuario", usuarioSchema);

// Exportamos el modelo
export default Usuario;