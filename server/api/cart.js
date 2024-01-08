const router = require("express").Router();
const {
  models: { User, CartItem, Order, Product },
} = require("../db");
module.exports = router;
const { requireToken } = require("./middleware");

router.get("/", requireToken, async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: req.user.dataValues.id,
        status: "open",
      },
      include: [Product],
      order: [[Product, "id", "DESC"]],
    });
    res.send(order);
  } catch (err) {
    next(err);
  }
});

router.post("/", requireToken, async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: req.user.dataValues.id,
        status: "open",
      },
      include: [Product],
    });

    if (!order) {
      order = await Order.create({
        status: "open",
        userId: req.user.dataValues.id,
      });
    }

    let product = await CartItem.findOne({
      where: {
        orderId: order.id,
        productId: req.body.productId,
      },
    });

    if (!product) {
      await CartItem.create({
        orderId: order.id,
        productId: req.body.productId,
      });
    } else {
      let newQuantity = parseInt(product.quantity) + 1;
      await product.update({
        quantity: newQuantity,
      });
    }
    // res.send(order);
    res.send(
      await Order.findOne({
        where: {
          id: order.id,
        },
        include: [Product],
        order: [[Product, "id", "DESC"]],
      })
    );
  } catch (err) {
    next(err);
  }
});

router.delete("/:productId", requireToken, async (req, res, next) => {
  try {
    let orderIdObj = await Order.findOne({
      where: {
        userId: req.user.dataValues.id,
        status: "open",
      },
    });

    if (orderIdObj) {
      await CartItem.destroy({
        where: {
          productId: req.params.productId,
          orderId: orderIdObj.id,
        },
      });
    }

    res.send(
      await Order.findOne({
        where: {
          userId: req.user.dataValues.id,
          status: "open",
        },
        include: [Product],
      })
    );
  } catch (err) {
    next(err);
  }
});

router.put("/", requireToken, async (req, res, next) => {
  try {
    let order = await Order.findOne({
      where: {
        userId: req.user.dataValues.id,
        status: "open",
      },
    });

    if (!order) {
      order = await Order.create({
        status: "open",
        userId: req.user.dataValues.id,
      });
    }

    let product = await CartItem.findOne({
      where: {
        orderId: order.id,
        productId: req.body.productId,
      },
    });

    const newQuantity = product.quantity + req.body.newQuantity;

    if (newQuantity <= 0) {
      await product.destroy();
    } else {
      await product.update({
        quantity: newQuantity,
      });
    }

    res.send(
      await Order.findOne({
        where: {
          id: order.id,
        },
        include: [Product],
        order: [[Product, "id", "DESC"]],
      })
    );
  } catch (err) {
    next(err);
  }
});

router.put("/orderSuccess", async (req, res, next) => {
  try {
    if (req.headers.authorization !== "guest") {
      if (req.body.id) {
        let order = await Order.findOne({
          where: {
            id: req.body.id,
            status: "open",
          },
        });

        if (!order) {
          return res.status(404).send("Order not found or status is not open");
        }

        order.update({
          status: "closed",
        });
      } else {
        const user = await User.findByToken(req.headers.authorization);
        let order = await Order.create({
          status: "closed",
          userId: user.id,
        });
        for (let i = 0; i < req.body.products.length; i++) {
          await CartItem.create({
            orderId: order.id,
            productId: req.body.products[i].cartItems.productId,
            quantity: req.body.products[i].cartItems.quantity,
            unitPrice: req.body.products[i].cartItems.unitPrice,
          });
        }
        res.send(
          await Order.findOne({
            where: {
              id: order.id,
              status: "closed",
            },
            include: [Product],
          })
        );
      }
    } else {
      let guestOrder = await Order.create({
        status: "closed",
      });
      for (let i = 0; i < req.body.products.length; i++) {
        await OrderItems.create({
          orderId: guestOrder.id,
          productId: req.body.products[i].orderItems.productId,
          quantity: req.body.products[i].orderItems.quantity,
          unitPrice: req.body.products[i].orderItems.unitPrice,
        });
      }
      res.send(
        await Order.findOne({
          where: {
            id: guestOrder.id,
            status: "closed",
          },
          include: [Product],
        })
      );
    }
  } catch (err) {
    next(err);
  }
});
