const pool = require('./pool');

async function getCategory(id) {
  const { rows } = await pool.query('SELECT * FROM categories WHERE id = $1', [
    id,
  ]);
  return rows[0];
}

async function getAllCategories() {
  const { rows } = await pool.query('SELECT * FROM categories');
  return rows;
}

async function addNewCategory(title) {
  await pool.query('INSERT INTO categories (title) VALUES ($1)', [title]);
}

async function updateCategory(id, title) {
  await pool.query('UPDATE categories SET title = $1 WHERE id = $2', [
    title,
    id,
  ]);
}

async function deleteCategory(id) {
  await Promise.all([
    pool.query('DELETE FROM categories WHERE id = $1', [id]),
    pool.query('DELETE FROM itemscategories WHERE category_id = $1', [id]),
  ]);
}

async function getItemCategories(id) {
  const { rows } = await pool.query(
    'SELECT title FROM itemscategories INNER JOIN categories ON itemscategories.category_id = categories.id WHERE item_id = $1',
    [id]
  );
  return rows;
}

module.exports = {
  getCategory,
  getAllCategories,
  addNewCategory,
  updateCategory,
  deleteCategory,
  getItemCategories,
};
