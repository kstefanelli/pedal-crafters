import React from "react";
import { Link } from "react-router-dom";

const OrderItem = ({ item }) => (
  <div className='grid gap-4 xl:gap-6 space-y-4 grid-cols-4 lg:grid-cols-6 items-center text-start'>
    <img
      className='rounded col-span-1 hidden lg:block'
      src={item.imageURL}
      alt={`Image of ${item.name}`}
    />
    <div className='col-span-2 text-xs lg:text-sm xl:text-lg'>
      <Link
        to={`/products/${item.id}`}
        className='text-black font-medium hover:opacity-50'
      >
        {item.name}
      </Link>
    </div>
    <div className='col-span-1 text-xs lg:text-sm xl:text-base hidden lg:block'>
      {(item.price / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}
    </div>
    <div className='col-span-1 text-xs lg:text-sm xl:text-base text-center'>
      {item.cartItem.quantity}
    </div>
    <div className='col-span-1 text-xs lg:text-sm xl:text-base'>
      {((item.cartItem.quantity * item.price) / 100).toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      })}
    </div>
  </div>
);

export default OrderItem;
