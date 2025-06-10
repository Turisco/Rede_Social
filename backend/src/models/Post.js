const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Post = sequelize.define('Post', {
  content: DataTypes.TEXT,
  media_url: DataTypes.STRING,
  media_type: DataTypes.ENUM('text', 'image', 'video'),
}, {
  timestamps: true,
});

module.exports = Post;
