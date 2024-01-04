import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product, addToCart, isAdminView }) => (
  <div
    className={`group flex flex-col hover:cursor-pointer items-center justify-between gap-4 px-4 py-6 rounded-lg bg-white border border-ocean relative overflow-hidden transition-shadow duration-300 ease-in-out transform hover:shadow-lg`}
  >
    <Link to={`/products/${product.id}`}>
      <img
        className='mx-auto aspect-auto h-auto w-auto'
        src={product.imageURL}
        alt={`Image of ${product.name}`}
      />
    </Link>
    <h3 className='text-center text-sm'>{product.name}</h3>
    <div className='text-center text-sm'>{`$${parseFloat(
      product.price / 100
    ).toFixed(2)}`}</div>
    <div className='flex flex-col space-y-2 justify-center'>
      {isAdminView && (
        <Link to={`/products/${product.id}/update`}>
          <button className='bg-[#085162] hover:opacity-50 text-white text-sm font-bold py-2 px-4 rounded'>
            Edit Product
          </button>
        </Link>
      )}
      <button
        className='bg-[#085162] hover:opacity-50 text-white text-sm font-bold py-2 px-4 rounded'
        onClick={() => addToCart(product)}
      >
        Add To Cart
      </button>
    </div>
  </div>
);

export default ProductItem;
