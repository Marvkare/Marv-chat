const mongoose = require('mongoose');
const { Schema } = mongoose;

const ChatSchema = new Schema({
	
  	nick: String,
  	pasword: String,
  	msg: String,
  	created: { type: Date, default: Date.now }
});

module.exports = mongoose.model('chat2', ChatSchema);


/*db.usuarios.insert({
  "cedula":"0922",
  "name":"Leonardo",
  "clave":"12345",
  "pais":"Mexico"
})

//db.createCollection("productos")
//eliminar
//db.nombre.drop()

//db.dropDatabase()
*/
//db.chat.insert({nick:"Marv"})