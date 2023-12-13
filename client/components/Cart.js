import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteFromCart,
  fetchCart,
  _updateCart,
  updateQuantity,
} from "../store/cart";
import { Link } from "react-router-dom";

class Cart extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.fetchCart();
  }

  handleDelete(productId) {
    this.props.deleteFromCart(productId);
  }

  calculateSubtotal() {
    if (this.props.cart && this.props.cart.products) {
      return this.props.cart.products.reduce((prev, curr) => {
        let calculatedPrice = (curr.price * curr.cartItem.quantity) / 100;
        return prev + calculatedPrice;
      }, 0);
    }
    return 0;
  }

  formatCurrency(value) {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  render() {
    const cartItemProps = this.props.cart.products || [];
    return (
      <div>
        <h2 style={{ textAlign: "center" }}>Cart</h2>
        <div className="cart-container">
          <div className="cart-section-left">
            <div className="shopping-cart-left-container">
              <div className="checkout-card-row">
                <div
                  className="subtotal-inline-block product-sec"
                  style={{ fontWeight: "bold" }}
                >
                  Product
                </div>
                <div
                  className="subtotal-inline-block quantity-sec-heading"
                  style={{ fontWeight: "bold" }}
                >
                  Quantity
                </div>
                <div
                  className="subtotal-inline-block price-sec-heading"
                  style={{ fontWeight: "bold" }}
                >
                  Price
                </div>
                <div className="subtotal-inline-block"></div>
              </div>
              {this.props.cart !== null && this.props.cart.products ? (
                this.props.cart.products.map((product) => (
                  <div key={product.id} className="checkout-card-row">
                    <div className="subtotal-inline-block product-sec">
                      {product.name}
                    </div>
                    <div className="quantity-section quantity-sec">
                      <button
                        className="increment-btn"
                        onClick={() => this.props.updateCart(product, -1)}
                      >
                        -
                      </button>
                      <div className="subtotal-inline-block">
                        {product.cartItem.quantity}
                      </div>
                      <button
                        className="increment-btn"
                        onClick={() => this.props.updateCart(product, 1)}
                      >
                        +
                      </button>
                    </div>
                    <div
                      className="subtotal-inline-block"
                      style={{ marginRight: "1rem" }}
                    >
                      {this.formatCurrency(product.price / 100)}
                    </div>
                    <button
                      type="button"
                      className="delete-btn"
                      onClick={() => this.handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                ))
              ) : (
                <p>Empty cart</p>
              )}
            </div>
          </div>
          <div className="cart-section-right">
            <div className="cart-card-right">
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: "bold",
                  margin: "1rem 2rem",
                }}
              >
                Total
              </span>
              <div className="checkout-card-row">
                <div
                  className="subtotal-inline-block"
                  style={{ fontWeight: "bold" }}
                >
                  Subtotal
                </div>
                <div className="subtotal-inline-block">
                  {this.formatCurrency(this.calculateSubtotal())}
                </div>
              </div>
              <div className="checkout-card-row">
                <div
                  className="subtotal-inline-block"
                  style={{ fontWeight: "bold" }}
                >
                  Shipping
                </div>
                <div className="subtotal-inline-block">
                  {this.formatCurrency(2.99)}
                </div>
              </div>
              <div className="checkout-card-row">
                <div
                  className="subtotal-inline-block"
                  style={{ fontWeight: "bold" }}
                >
                  Total
                </div>
                <div className="subtotal-inline-block">
                  {this.formatCurrency(this.calculateSubtotal() + 2.99)}
                </div>
              </div>
              <div className="checkout-card-row checkout-button-cont">
                <Link to="/checkout">
                  <button className="checkout-btn">Proceed To Checkout</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cart: state.cart,
});

const mapDispatchToProps = (dispatch) => ({
  fetchCart: () => dispatch(fetchCart()),
  deleteFromCart: (productId) => dispatch(deleteFromCart(productId)),
  updateCart: (product, newQuantity) =>
    dispatch(updateQuantity(product, newQuantity)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
