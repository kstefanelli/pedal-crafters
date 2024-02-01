const db = require("./db");

const User = require("./models/User");
const Product = require("./models/Product");
const CartItem = require("./models/CartItem");
const Order = require("./models/Order");
const WishlistItem = require("./models/WishlistItem");

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    CartItem,
    WishlistItem,
  },
};

User.hasMany(Order);
Order.belongsTo(User);
Order.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Order, { through: CartItem });

User.belongsToMany(Product, { through: WishlistItem });
Product.belongsToMany(User, { through: WishlistItem });
