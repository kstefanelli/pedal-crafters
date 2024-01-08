import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product, addToCart, isAdminView }) => (
  <div className='group p-4 cards z-10 text-center shadow-lg bg-white flex flex-col gap-4 custom-drop rounded-xl overflow-hidden transition-transform duration-300 ease-in-out transform hover:scale-105'>
    <Link to={`/products/${product.id}`} className='flex flex-col grow'>
      <img
        className='aspect-video object-cover overflow-hidden'
        src={product.imageURL}
        alt={`Image of ${product.name}`}
      />
    </Link>

    <div className='flex flex-col gap-2'>
      <Link to={`/products/${product.id}`} className='flex flex-col grow'>
        <b>{product.name}</b>
      </Link>

      <div>{`$${parseFloat(product.price / 100).toFixed(2)}`}</div>
    </div>
    <div className='flex justify-center cursor-pointer'>
      <div className='flex flex-col gap-2'>
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
  </div>
);

export default ProductItem;
