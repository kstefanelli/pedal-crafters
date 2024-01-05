import React from "react";
import { Link } from "react-router-dom";

const OrderItem = ({ item }) => (
  <div className='order-item-container'>
    <img
      className='order-img'
      src={item.imageURL}
      alt={`Image of ${item.name}`}
    />
    <div className='s-order-name'>
      <Link to={`/products/${item.id}`}>
        <span>{item.name}</span>
      </Link>
    </div>
    <span style={{ fontSize: ".8rem" }} className='s-order-price'>
      {(item.price / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}
    </span>
    <span style={{ fontSize: ".8rem" }} className='s-order-quantity'>
      {item.cartItem.quantity}
    </span>
    <span style={{ fontSize: ".8rem" }}>
      {((item.cartItem.quantity * item.price) / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}
    </span>
  </div>
);

export default OrderItem;
