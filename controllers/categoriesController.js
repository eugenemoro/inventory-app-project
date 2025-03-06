const db = require('../db/categoriesQueries');

async function getNewCategory(req, res) {
  res.render('edit-category', { title: 'New category' });
}

async function getCategory(req, res) { 
  const { id } = req.params;
  const category = await db.getCategory(id);
  res.render('edit-category', { title: 'Edit category', category });
}

async function getAllCategories(req, res) {
  const categories = await db.getAllCategories();
  res.render('categories', { title: 'Categories', categories });
}

async function postNewCategory(req, res) {
  const { title } = req.body;
  await db.addNewCategory(title);
  res.redirect('/categories');
}

async function postUpdateCategory(req, res) {
  const { id } = req.params;
  const { title } = req.body;
  console.log('update cat', id, title)
  await db.updateCategory(id, title);
  res.redirect('/categories');
}

async function postDeleteCategory(req, res) {
  const { id } = req.params;
  await db.deleteCategory(id);
  res.redirect('/categories');
}

module.exports = {
  getCategory,
  getAllCategories,
  getNewCategory,
  postNewCategory,
  postUpdateCategory,
  postDeleteCategory,
};
