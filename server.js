const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à la base de données
sequelize.authenticate()
  .then(() => console.log('Connexion à la base de données réussie'))
  .catch(err => console.error('Erreur de connexion à la base de données :', err));

// Routes principales
app.use('/api/users', userRoutes);

// Lancer le serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(Serveur backend lancé sur le port ${PORT});
});
