const router = require('express').Router();
const {
  models: { User, Order, Product },
} = require('../db');
const { requireToken, isAdmin } = require('./middleware');
module.exports = router;

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      where: {
        isAdmin: false
      }
    });
    res.send(users);
  } catch (err) {
    next(err);
  }
});


router.post('/', async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const userToken = await newUser.generateToken();
    res.send(userToken);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.get('/profile', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.dataValues.id, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'password', 'address'],
    });
    res.send(user);
  } catch (err) {
    next(err);
  }
});

router.put('/account', requireToken, async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.dataValues.id, {
      attributes: ['id', 'firstName', 'lastName', 'password', 'email', 'address'],
    });
    await user.update(req.body);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

router.get('/orders', requireToken, async (req, res, next) => {
  try {
    const userOrder = await Order.findAll({
      where: {
        userId: req.user.dataValues.id,
        status: 'closed',
      },
      include: [
        {
          model: Product,
        },
      ],
    });
    res.send(userOrder);
  } catch (err) {
    next(err);
  }
});
