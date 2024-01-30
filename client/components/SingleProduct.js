import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import { addToCart } from "../store/cart";
import { addToWishlist } from "../store/wishlist";
import { Link } from "react-router-dom";

const SingleProduct = ({
  product,
  getSingleProduct,
  addToCart,
  addToWishlist,
  match,
  isLoggedIn,
}) => {
  useEffect(() => {
    getSingleProduct(match.params.id);
  }, [getSingleProduct, match.params.id]);

  const handleAdd = () => {
    addToCart(product);
  };

  const handleAddToWishlist = () => {
    addToWishlist(product.id);
  };

  const renderProductDetails = () => (
    <div className='mx-auto p-10 lg:p-20'>
      <div className='flex items-center justify-center gap-8'>
        <img
          src={product.imageURL}
          className='hidden lg:block object-contain w-1/2 rounded-lg shadow-lg'
          alt={product.name}
        />
        <div className='flex flex-col space-y-4'>
          <p className='text-xl font-bold'>{product.name}</p>

          <p className='text-xl font-semibold'>
            ${parseFloat(product.price / 100).toFixed(2)}
          </p>
          <img
            src={product.imageURL}
            className='object-contain w-full rounded-lg shadow-lg lg:hidden'
            alt={product.name}
          />
          <p className='text-sm'>{product.description}</p>

          <button
            className='bg-[#321e1e] hover:opacity-50 text-white text-sm font-bold py-2 px-4 rounded'
            onClick={handleAdd}
          >
            Add to cart
          </button>

          {isLoggedIn && (
            <button
              className='bg-[#321e1e] hover:opacity-50 text-white text-sm font-bold py-2 px-4 rounded'
              onClick={handleAddToWishlist}
            >
              Add to wishlist
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderNoProduct = () => (
    <div className='flex flex-col items-center'>
      <p className='text-xl font-semibold mb-2'>Check back soon!</p>
      <Link to='/' className='text-[#321e1e]'>
        <p className='text-xl font-semibold'>Return to Shop</p>
      </Link>
    </div>
  );

  return (
    <div>
      {product && product.id ? renderProductDetails() : renderNoProduct()}
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.singleProduct,
  isLoggedIn: !!state.auth.id,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProduct: (id) => dispatch(fetchProduct(id)),
  addToCart: (product) => dispatch(addToCart(product)),
  addToWishlist: (id) => dispatch(addToWishlist(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
