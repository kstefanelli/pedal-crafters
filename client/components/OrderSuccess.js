import React, { useEffect } from "react";
import { connect } from "react-redux";
import { emptyCart } from "../store/cart";

const OrderSuccess = ({ cart, emptyCart }) => {
  useEffect(() => {
    const emptyUserCart = async () => {
      try {
        await emptyCart(cart);
      } catch (error) {
        console.error("Error emptying cart:", error);
      }
    };

    emptyUserCart();
  }, [cart, emptyCart]);

  const generateOrderNumber = () => {
    const getRandomNumber = () => Math.floor(Math.random() * 9999);
    return `${getRandomNumber()}-${getRandomNumber()}-${getRandomNumber()}`;
  };

  return (
    <div className='div-container'>
      <h1 style={{ textAlign: "center", marginTop: "150px" }}>
        Thank you for your order!
      </h1>
      <h3 style={{ textAlign: "center" }}>
        Your Order Number: {generateOrderNumber()}
      </h3>
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
