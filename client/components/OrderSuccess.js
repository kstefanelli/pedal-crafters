import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { emptyCart } from "../store/cart";

const OrderSuccess = ({ cart, emptyCart }) => {
  const [orderNumber, setOrderNumber] = useState(null);

  useEffect(() => {
    if (cart && cart.totalQuantity > 0) {
      const emptyUserCart = async () => {
        try {
          await emptyCart(cart);
        } catch (error) {
          console.error("Error emptying cart:", error);
        }
      };
      emptyUserCart();
    }
  }, [cart, emptyCart]);

  useEffect(() => {
    const generateOrderNumber = () => {
      const getRandomNumber = () => Math.floor(Math.random() * 9999);
      return `${getRandomNumber()}-${getRandomNumber()}-${getRandomNumber()}`;
    };

    const existingOrderNumber = localStorage.getItem("orderNumber");

    if (!existingOrderNumber) {
      const newOrderNumber = generateOrderNumber();
      console.log("New Order Number:", newOrderNumber);

      setOrderNumber(newOrderNumber);
      localStorage.setItem("orderNumber", newOrderNumber);
    } else {
      setOrderNumber(existingOrderNumber);
    }
  }, []);

  return (
    <div className='mt-16 text-center'>
      <h1 className='text-3xl font-bold mb-4'>Thank you for your order!</h1>
      <h3 className='text-lg'>Your Order Number: {orderNumber}</h3>
    </div>
  );
};

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  emptyCart: (cart) => dispatch(emptyCart(cart)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OrderSuccess);
