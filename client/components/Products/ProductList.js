import React from "react";
import ProductItem from "./ProductItem";

const ProductList = ({ products, addToCart, isAdminView }) => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          addToCart={addToCart}
          isAdminView={isAdminView}
        />
      ))}
    </div>
  );
};

export default ProductList;
