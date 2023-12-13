const router = require('express').Router();
const {
  models: { User, CartItem, Order, Product },
} = require('../db');

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.send(products);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.update(req.body);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.get('/category/:categoryName', async (req, res, next) => {
  try {
    const categoryName = req.params.categoryName.toLowerCase();
    if (
      ['tracklocross', 'track', 'road', 'gravel'].indexOf(categoryName) > -1
    ) {
      const result = await Product.findAll({
        where: {
          category: categoryName,
        },
      });
      res.send(result);
    } else {
      throw new Error('Category name not found');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
