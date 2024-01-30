const router = require("express").Router();
const {
  models: { User, Product },
} = require("../db");

const { requireTokenMiddleware } = require("../auth-middleware");
const { idSchema } = require("./validationSchemas");

router.get("/", requireTokenMiddleware, async (req, res, next) => {
  try {
    const wishlistItems = await req.user.getWishlistItems();
    res.json(wishlistItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    await idSchema.validate(req.params);
    const productId = req.params.id;

    const product = await Product.findByPk(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    await req.user.addWishlistItem(productId);

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", requireTokenMiddleware, async (req, res, next) => {
  try {
    await idSchema.validate(req.params);
    const productId = req.params.id;

    const removed = await req.user.removeWishlistItem(productId);

    if (removed) {
      res.sendStatus(200);
    } else {
      res.status(404).json({ error: "Product not found in wishlist" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
