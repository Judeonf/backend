const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const { makeSoleaspayPayment } = require('../utils/soleaspay');

// Fonction d'enregistrement
exports.register = async (req, res) => {
  const { username, email, password, phone, whatsapp, country, referrerCode } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Utilisateur déjà enregistré.' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phone,
      whatsapp,
      country,
      referrerCode,
      isActive: false
    });

    res.status(201).json({ message: 'Inscription réussie.', userId: newUser.id });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Fonction de connexion
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: 'Email incorrect.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Mot de passe incorrect.' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });

    res.json({ token });

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Voir le profil utilisateur
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable.' });
    }

    res.json(user);

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};

// Activation du compte avec API Soleaspay
exports.activateAccount = async (req, res) => {
  const { paymentReference } = req.body;

  try {
    const paymentResult = await makeSoleaspayPayment(paymentReference);

    if (paymentResult.success) {
      await User.update({ isActive: true }, { where: { id: req.user.id } });
      return res.json({ message: 'Compte activé.' });
    } else {
      return res.status(400).json({ message: 'Paiement non validé.' });
    }

  } catch (error) {
    res.status(500).json({ message: 'Erreur d\'activation.', error: error.message });
  }
};

// Demande de retrait (à améliorer)
exports.requestWithdrawal = async (req, res) => {
  const { amount, method } = req.body;

  try {
    const user = await User.findByPk(req.user.id);

    if (user.balance < amount) {
      return res.status(400).json({ message: 'Solde insuffisant.' });
    }

    // Ici, tu peux automatiser avec l'API de paiement

    await User.update(
      { balance: user.balance - amount },
      { where: { id: req.user.id } }
    );

    res.json({ message: 'Demande de retrait enregistrée.' });

  } catch (error) {
    res.status(500).json({ message: 'Erreur retrait.', error: error.message });
  }
};

// Route Admin : Voir les utilisateurs
exports.adminGetUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);

  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur.', error: error.message });
  }
};
