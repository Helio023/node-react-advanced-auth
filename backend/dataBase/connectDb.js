const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('Base de dados conectada com sucesso!');
    })
    .catch((e) => {
      console.log(`Erro ao conectar a base de dados: ${e.message}`);
    });
};

module.exports = connectDB;
