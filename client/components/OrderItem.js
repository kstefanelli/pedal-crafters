import React from "react";
import { Link } from "react-router-dom";

const OrderItem = ({ item }) => (
  <div className='grid gap-4 grid-cols-5 lg:grid-cols-6 items-center'>
    <img
      className='rounded col-span-1 hidden lg:block'
      src={item.imageURL}
      alt={`Image of ${item.name}`}
    />
    <div className='col-span-2'>
      <Link
        to={`/products/${item.id}`}
        className='text-black text-xs font-bold hover:opacity-50'
      >
        {item.name}
      </Link>
    </div>
    <div className='col-span-1 text-sm'>
      {(item.price / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}
    </div>
    <div className='col-span-1 text-sm'>{item.cartItem.quantity}</div>
    <div className='col-span-1 text-sm'>
      {((item.cartItem.quantity * item.price) / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}
    </div>
  </div>
);

export default OrderItem;
