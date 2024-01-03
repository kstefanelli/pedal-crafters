import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchProduct } from "../store/singleProduct";
import { addToCart } from "../store/cart";
import { Link } from "react-router-dom";

const SingleProduct = ({ product, getSingleProduct, addToCart, match }) => {
  useEffect(() => {
    getSingleProduct(match.params.id);
  }, [getSingleProduct, match.params.id]);

  const handleAdd = () => {
    addToCart(product);
  };

  return (
    <div>
      {product && product.id ? (
        <div>
          <section className='s-product-name '>
            <h1>{product.name}</h1>
          </section>

          <div className='s-product-main'>
            <div className='s-product-main-box'>
              <img
                src={product.imageURL}
                className='s-product-img'
                alt={product.name}
              />
            </div>
            <div className='s-product-main-description'>
              <p className='s-product-detail-price'>
                ${parseFloat(product.price / 100).toFixed(2)}
              </p>
              <p className='s-product-detail-description'>
                {product.description}
              </p>

              <button className='add-to-cart-btn' onClick={handleAdd}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className='nfp-single-product'>
          <p className='nfp-info'>Check back soon!</p>
          <Link to='/'>
            <p className='nfp-info'>Return to Shop</p>
          </Link>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  product: state.singleProduct,
});

const mapDispatchToProps = (dispatch) => ({
  getSingleProduct: (id) => dispatch(fetchProduct(id)),
  addToCart: (product) => dispatch(addToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct);
