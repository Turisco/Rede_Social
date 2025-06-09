const db = require('../config/database');

const User = {
  create: (data, callback) => {
    const query = 'INSERT INTO users (username, email, password, birthdate, profile_picture) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [data.username, data.email, data.password, data.birthdate, data.profile_picture], callback);
  }
};

module.exports = User;
