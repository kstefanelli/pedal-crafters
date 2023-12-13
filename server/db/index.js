const db = require('./db');

const User = require('./models/User');
const Product = require('./models/Product');
const CartItem = require('./models/CartItem');
const Order = require('./models/Order');

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    CartItem,
  },
};

User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Order, { through: CartItem });
