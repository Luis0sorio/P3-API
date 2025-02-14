
// Importamos la libreria 'mongoose'
import mongoose from 'mongoose';

// Importamos la libreria para manejar variables de entorno (conexion a la base de datos)
import 'dotenv/config';

// Creo la funcion de conexion a nuestra base de datos
const conexionDB = async() => {
  try {
    // establecemos la conexion con la base de datos
    const conexion = await mongoose.connect(process.env.MONGO_URI, {});
    console.log(`Conectado a MongoDB: ${conexion.connection.host}`); // mensaje de exito
  } catch (error) {
    console.error(error.message); // mensaje de error
    process.exit(1); // detiene la aplicacion si hay un error
  }
}

// Exportamos la funcion para ser utilizada en otros archivos del proyecto
export default conexionDB;