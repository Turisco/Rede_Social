const connection = require('../db');

exports.createGroup = (name, description, creator_id) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO groups (name, description, creator_id) VALUES (?, ?, ?)';
    connection.query(query, [name, description, creator_id], (err, results) => {
      if (err) return reject(err);
      resolve(results.insertId);
    });
  });
};

exports.addMember = (group_id, user_id, role) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO group_members (group_id, user_id, role) VALUES (?, ?, ?)';
    connection.query(query, [group_id, user_id, role], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

exports.isMember = (group_id, user_id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM group_members WHERE group_id = ? AND user_id = ?';
    connection.query(query, [group_id, user_id], (err, results) => {
      if (err) return reject(err);
      resolve(results.length > 0);
    });
  });
};

exports.removeMember = (group_id, user_id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM group_members WHERE group_id = ? AND user_id = ?';
    connection.query(query, [group_id, user_id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};

exports.getMembers = (group_id) => {
  return new Promise((resolve, reject) => {
    const query = `
      SELECT users.id, users.name, gm.role
      FROM group_members gm
      JOIN users ON gm.user_id = users.id
      WHERE gm.group_id = ?
    `;
    connection.query(query, [group_id], (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.getAllGroups = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM groups ORDER BY created_at DESC';
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

exports.checkAdmin = (group_id, user_id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM group_members WHERE group_id = ? AND user_id = ? AND role = "admin"';
    connection.query(query, [group_id, user_id], (err, results) => {
      if (err) return reject(err);
      resolve(results.length > 0);
    });
  });
};

exports.deleteGroup = (group_id) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM groups WHERE id = ?';
    connection.query(query, [group_id], (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
};
