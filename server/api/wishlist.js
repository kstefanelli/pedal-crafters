const router = require("express").Router();
const {
  models: { Product, WishlistItem },
} = require("../db");
const { requireToken } = require("./middleware");

router.get("/wishlist", requireToken, async (req, res, next) => {
  try {
    const { id } = req.user.dataValues;
    const wishlist = await WishlistItem.findAll({
      where: {
        userId: id,
      },
      include: [Product],
      order: [[Product, "id", "DESC"]],
    });

    res.status(200).send(wishlist);
  } catch (err) {
    next(err);
  }
});

// Add to wishlist
router.post("/wishlist/:productId", requireToken, async (req, res, next) => {
  try {
    const { id } = req.user.dataValues;
    const { productId } = req.params;

    const existingWishlistItem = await WishlistItem.findOne({
      where: {
        userId: id,
        productId,
      },
    });

    if (existingWishlistItem) {
      return res.status(400).send("Product already in wishlist");
    }

    await WishlistItem.create({
      userId: id,
      productId,
    });

    const wishlist = await WishlistItem.findAll({
      where: {
        userId: id,
      },
      include: [Product],
      order: [[Product, "id", "DESC"]],
    });

    res.status(200).send(wishlist);
  } catch (err) {
    next(err);
  }
});

// Remove from wishlist
router.delete("/:productId", requireToken, async (req, res, next) => {
  try {
    const { id } = req.user.dataValues;
    const { productId } = req.params;

    await WishlistItem.destroy({
      where: {
        userId: id,
        productId,
      },
    });

    const wishlist = await WishlistItem.findAll({
      where: {
        userId: id,
      },
      include: [Product],
      order: [[Product, "id", "DESC"]],
    });

    res.status(200).send(wishlist);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
