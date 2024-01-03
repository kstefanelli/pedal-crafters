import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/allProducts";
import { addToCart } from "../store/cart";
import Search from "./Search";

const filterProducts = (product, category) => {
  if (category === "All") return true;
  return product.category === category.toLowerCase();
};

const categories = ["All", "Track", "Tracklocross", "Gravel", "Road"];

const ProductItem = ({ product, addToCart }) => (
  <div className='grid-item' key={product.id}>
    <Link to={`/products/${product.id}`}>
      <img
        className='shop-image'
        src={product.imageURL}
        alt={`Image of ${product.name}`}
      />
    </Link>
    <div className='track-description'>
      <h3 className='grid-item-text'>{product.name}</h3>
      <p className='grid-item-text'>
        ${parseFloat(product.price / 100).toFixed(2)}
      </p>
      <div className='shop-btn-container'>
        <button
          className='add-to-cart shop-btn'
          onClick={() => addToCart(product)}
        >
          Add To Cart
        </button>
      </div>
    </div>
  </div>
);

const Products = ({ products, getProducts, addToCart }) => {
  const [filtered, setFiltered] = useState("All");
  const [term, setTerm] = useState("");

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  const handleFilterClick = (categoryName) => {
    setFiltered(categoryName);
  };

  const productFilter = products.filter((product) =>
    filterProducts(product, filtered)
  );

  return (
    <section className='grid-section'>
      Bicycles
      <div className='grid-container'>
        <div className='grid-section-left'>
          <Search onSearchChange={(term) => setTerm(term)} />
          <p className='grid-section-left-category-bold'>Categories</p>
          <ul className='all-categories-list'>
            {categories.map((category) => (
              <li
                key={`cat-${category.toLowerCase()} shop-cat`}
                className={`cat-list${filtered === category ? " active" : ""}`}
                onClick={() => handleFilterClick(category)}
              >
                {category}
              </li>
            ))}
          </ul>
        </div>

        <div className='grid-section-right'>
          {productFilter.map((product) =>
            product.name.toLowerCase().includes(term.toLowerCase()) ? (
              <ProductItem
                key={product.id}
                product={product}
                addToCart={addToCart}
              />
            ) : (
              ""
            )
          )}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  getProducts: () => dispatch(fetchProducts()),
  addToCart: (product) => dispatch(addToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
