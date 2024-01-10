import React from "react";
import { Link } from "react-router-dom";

const OrderItem = ({ item }) => (
  <div className='grid grid-cols-5 gap-2 mt-4'>
    <img
      className='rounded'
      src={item.imageURL}
      alt={`Image of ${item.name}`}
    />
    <div>
      <Link to={`/products/${item.id}`} className='text-black font-medium'>
        {item.name}
      </Link>
    </div>
    <span className='text-sm'>
      {(item.price / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}
    </span>
    <span className='text-sm'>{item.cartItem.quantity}</span>
    <span className='text-sm'>
      {((item.cartItem.quantity * item.price) / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}
    </span>
  </div>
);

export default OrderItem;
