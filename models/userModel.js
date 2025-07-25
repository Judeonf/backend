const { DataTypes } = require('sequelize');
const sequelize = require('../config');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  whatsappNumber: {
    type: DataTypes.STRING,
    allowNull: false
  },
  referralCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  referredBy: {
    type: DataTypes.STRING,
    allowNull: true
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user'
  },
  balanceMain: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  balanceYoutube: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  balanceTiktok: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  balanceInstagram: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  balanceSpinWheel: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  balanceTrivia: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  bonusWelcome: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  }
});

User.sync();

module.exports = User;