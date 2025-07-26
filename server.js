const express = require('express');
const app = express();
const userRoutes = require('./routes/userRoutes');
const sequelize = require('./db');
require('dotenv').config();

app.use(express.json());
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
 HEAD
app.listen(PORT, () => {
  console.log(`
Serveur backend lancé sur le port ${PORT}`
);
});

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log('Serveur lancé sur le port ${PORT}');
  });
}).catch(err => {
  console.error('Erreur de connexion à la base de données:', err);
});
