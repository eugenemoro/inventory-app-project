const pool = require('./pool');

async function getItem(id) {
  const { rows } = await pool.query('SELECT * FROM items WHERE id = $1', [id]);
  return rows[0];
}

async function getAllItems() {
  const { rows } = await pool.query('SELECT * FROM items');
  return rows;
}

async function addItem(title, description, price, categories) {
  console.log(categories);
  const [rawId, rawCategories] = await Promise.all([
    pool.query(
      'INSERT INTO items (title, description, price) VALUES ($1, $2, $3) RETURNING id',
      [title, description, price]
    ),
    pool.query('SELECT id FROM categories WHERE title = ANY($1)', [categories]),
  ]);
  const id = rawId.rows[0].id;
  const categoriesId = rawCategories.rows;
  console.log(id, rawCategories);
  await categoriesId.forEach((categoryId) => {
    pool.query(
      'INSERT INTO itemscategories (item_id, category_id) VALUES ($1, $2)',
      [id, categoryId.id]
    );
  });
}

async function updateItem(id, title, description, price) {
  await Promise.all([
    pool.query(
      'UPDATE items SET title = $1, description = $2, price = $3 WHERE id = $4',
      [title, description, price, id]
    ),
  ]);
}

async function deleteItem(id) {
  await Promise.all([
    pool.query('DELETE FROM itemscategories WHERE item_id = $1', [id]),
    pool.query('DELETE FROM items WHERE id = $1', [id]),
  ]);
}

async function addCategory(id, category) {
  const { rows } = await pool.query(
    'SELECT id FROM categories WHERE title = $1',
    [category]
  );
  const categoryId = rows[0].id;
  await pool.query(
    'INSERT INTO itemscategories (item_id, category_id) VALUES ($1, $2)',
    [id, categoryId]
  );
}

async function removeCategory(id, category) {
  const { rows } = await pool.query(
    'SELECT id FROM categories WHERE title = $1',
    [category]
  );
  const categoryId = rows[0].id;
  await pool.query(
    'DELETE FROM itemscategories WHERE item_id = $1 AND category_id = $2',
    [id, categoryId]
  );
}

module.exports = {
  getItem,
  getAllItems,
  addItem,
  updateItem,
  deleteItem,
  addCategory,
  removeCategory,
};
