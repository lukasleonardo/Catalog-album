require('dotenv').config
const mongoose = require('mongoose');
const mongoDBURL = process.env.MONGODB_URI


mongoose.connect(mongoDBURL, { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro de conexão ao MongoDB:'));
db.once('open', () => {
  console.log('Conectado ao MongoDB');
});


module.exports = mongoose
