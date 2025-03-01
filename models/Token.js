
const mongoose = require('mongoose');
const {Schema} = mongoose;

const tokenSchema = new Schema({
  token: { type: String, required: true },
  expiracion: { type:Date, required: true },
});

// Crear un índice para eliminar tokens expirados automáticamente
tokenSchema.index({expiresAt: 1}, {expireAfterSeconds: 0});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;