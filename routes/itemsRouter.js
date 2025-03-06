const express = require('express');
const router = express.Router();

const itemsController = require('../controllers/itemsController');

router.get('/', itemsController.getAllItems);
router.get('/new', itemsController.getNewItem);
router.post('/new', itemsController.postNewItem);
router.get('/:id/add-category/:category', itemsController.getAddCategory);
router.get('/:id/remove-category/:category', itemsController.getRemoveCategory);
router.get('/:id', itemsController.getItem);
router.post('/:id/update', itemsController.postUpdateItem);
router.post('/:id/delete', itemsController.postDeleteItem);

module.exports = router;
