
const mongoose = require('mongoose');
const {Schema} = mongoose;

const tokenSchema = new Schema({
  token: { type: String, required: true , unique: true},
  expiracion: { type:Date, required: true },
});

const Token = mongoose.model("Token", tokenSchema);
module.exports = Token;