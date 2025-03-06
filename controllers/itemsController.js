const db = require('../db/itemsQueries');
const dbCategories = require('../db/categoriesQueries');

async function getItem(req, res) {
  const { id } = req.params;
  const [item, itemCategories, allCategories] = await Promise.all([
    db.getItem(id),
    dbCategories.getItemCategories(id),
    dbCategories.getAllCategories(),
  ]);

  item.categories = itemCategories;

  res.render('edit-item', {
    title: 'Edit item',
    item,
    categories: allCategories,
  });
}

async function getAllItems(req, res) {
  const items = await db.getAllItems();
  for (let i = 0; i < items.length; i++) {
    const categories = await dbCategories.getItemCategories(items[i].id);
    items[i].categories = categories;
  }
  res.render('items', { title: 'All items', items });
}

async function getNewItem(req, res) {
  res.render('new-item', {
    title: 'New item',
    categories: await dbCategories.getAllCategories(),
  });
}

async function postNewItem(req, res) {
  const { title, description, price, ...categoriesObj } = req.body;
  const categories = Object.keys(categoriesObj);
  await db.addItem(title, description, price, categories);
  res.redirect('/items');
}

async function postUpdateItem(req, res) {
  const { id } = req.params;
  const { title, description, price } = req.body;
  await db.updateItem(id, title, description, price);
  res.redirect('/items');
}

async function postDeleteItem(req, res) {
  const { id } = req.params;
  await db.deleteItem(id);
  res.redirect('/items');
}

async function getAddCategory(req, res) {
  const { id, category } = req.params;
  await db.addCategory(id, category);
  res.redirect('/items/' + id);
}

async function getRemoveCategory(req, res) {
  const { id, category } = req.params;
  await db.removeCategory(id, category);
  res.redirect('/items/' + id);
}

module.exports = {
  getItem,
  getAllItems,
  getNewItem,
  postNewItem,
  postUpdateItem,
  postDeleteItem,
  getAddCategory,
  getRemoveCategory,
};
