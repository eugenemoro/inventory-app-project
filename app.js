const path = require('path');
const express = require('express');
const app = express();

const itemsRouter = require('./routes/itemsRouter');
const categoriesRouter = require('./routes/categoriesRouter');

const viewsPath = path.join(__dirname, 'views/pages');
app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));

const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

app.use('/items', itemsRouter);
app.use('/categories', categoriesRouter);
app.get('/', (req, res) => {
  res.redirect('/items');
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
