import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/allProducts";
import { addToCart } from "../store/cart";
import Search from "./Search";

const CategoryFilter = ({ categories, filtered, handleFilterClick }) => {
  return (
    <div className='grid-section-left'>
      <Search />
      <p className='grid-section-left-category-bold'>Categories</p>
      <ul>
        {categories.map((category) => (
          <li
            key={`cat-${category.toLowerCase()} shop-cat`}
            className={`${
              category === "All" ? "all-categories-list" : "cat-list"
            }${filtered === category ? " active" : ""}`}
            onClick={() => handleFilterClick(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

const AdminShop = ({ products, getProducts, addToCart }) => {
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

  const productFilter = products.filter((product) => {
    if (filtered === "All") return product;
    return product.category === filtered;
  });

  const categories = ["All", "Track", "Tracklocross", "Gravel", "Road"];

  return (
    <section className='grid-section '>
      Bicycles
      <div className='grid-container'>
        <CategoryFilter
          categories={categories}
          filtered={filtered}
          handleFilterClick={handleFilterClick}
        />

        <div className='grid-section-right'>
          {productFilter.map((product) => (
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
                  <Link to={`/products/${product.id}/update`}>
                    <button className='view-more-btn shop-btn'>
                      Edit Product
                    </button>
                  </Link>
                  <button
                    className='add-to-cart shop-btn'
                    onClick={() => addToCart(product)}
                  >
                    Add To Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminShop);
