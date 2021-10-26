const getQuery = (table) => `SELECT * FROM ${table} ORDER BY id asc`;

const getByIdQuery = (table) =>
  `SELECT * FROM ${table} WHERE id = ? ORDER BY id asc`;

const getDuplicateQuery = (table) => `SELECT * FROM ${table} WHERE name LIKE ?`;

const addQuery = (table) => `INSERT INTO ${table} SET ?`;

const editQuery = (table) => `UPDATE ${table} SET ? WHERE id = ?`;

const deleteQuery = (table) => `DELETE FROM ${table} WHERE id = ?`;

module.exports = {
  getQuery,
  getByIdQuery,
  getDuplicateQuery,
  addQuery,
  editQuery,
  deleteQuery,
};
