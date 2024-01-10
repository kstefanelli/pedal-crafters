const router = require("express").Router();
const {
  models: { User, CartItem, Order, Product },
} = require("../db");
module.exports = router;
const { requireToken } = require("./middleware");

// Constants
const ORDER_STATUS = {
  OPEN: "open",
  CLOSED: "closed",
};

router.get("/", requireToken, async (req, res, next) => {
  try {
    const { id } = req.user.dataValues;
    const order = await Order.findOne({
      where: {
        userId: id,
        status: ORDER_STATUS.OPEN,
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
    const { id } = req.user.dataValues;
    let order = await Order.findOne({
      where: {
        userId: id,
        status: ORDER_STATUS.OPEN,
      },
      include: [Product],
    });

    if (!order) {
      order = await Order.create({
        status: ORDER_STATUS.OPEN,
        userId: id,
      });
    }

    const { productId } = req.body;
    let product = await CartItem.findOne({
      where: {
        orderId: order.id,
        productId,
      },
    });

    if (!product) {
      await CartItem.create({
        orderId: order.id,
        productId,
      });
    } else {
      const newQuantity = parseInt(product.quantity) + 1;
      await product.update({
        quantity: newQuantity,
      });
    }

    const updatedOrder = await Order.findOne({
      where: {
        id: order.id,
      },
      include: [Product],
      order: [[Product, "id", "DESC"]],
    });

    res.status(200).send(updatedOrder);
  } catch (err) {
    next(err);
  }
});

router.delete("/:productId", requireToken, async (req, res, next) => {
  try {
    const { id } = req.user.dataValues;
    const orderIdObj = await Order.findOne({
      where: {
        userId: id,
        status: ORDER_STATUS.OPEN,
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

    const updatedOrder = await Order.findOne({
      where: {
        userId: id,
        status: ORDER_STATUS.OPEN,
      },
      include: [Product],
    });

    res.status(200).send(updatedOrder);
  } catch (err) {
    next(err);
  }
});

router.put("/", requireToken, async (req, res, next) => {
  try {
    const { id } = req.user.dataValues;
    let order = await Order.findOne({
      where: {
        userId: id,
        status: ORDER_STATUS.OPEN,
      },
    });

    if (!order) {
      order = await Order.create({
        status: ORDER_STATUS.OPEN,
        userId: id,
      });
    }

    const { productId, newQuantity } = req.body;
    let product = await CartItem.findOne({
      where: {
        orderId: order.id,
        productId,
      },
    });

    const updatedQuantity = product.quantity + newQuantity;

    if (updatedQuantity <= 0) {
      await product.destroy();
    } else {
      await product.update({
        quantity: updatedQuantity,
      });
    }

    const updatedOrder = await Order.findOne({
      where: {
        id: order.id,
      },
      include: [Product],
      order: [[Product, "id", "DESC"]],
    });

    res.status(200).send(updatedOrder);
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
            status: ORDER_STATUS.OPEN,
          },
        });

        if (!order) {
          return res.status(404).send("Order not found or status is not open");
        }

        order.update({
          status: ORDER_STATUS.CLOSED,
        });
      } else {
        const user = await User.findByToken(req.headers.authorization);
        let order = await Order.create({
          status: ORDER_STATUS.CLOSED,
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
              status: ORDER_STATUS.CLOSED,
            },
            include: [Product],
          })
        );
      }
    } else {
      let guestOrder = await Order.create({
        status: ORDER_STATUS.CLOSED,
      });
      for (let i = 0; i < req.body.products.length; i++) {
        await CartItem.create({
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
            status: ORDER_STATUS.CLOSED,
          },
          include: [Product],
        })
      );
    }
  } catch (err) {
    next(err);
  }
});
