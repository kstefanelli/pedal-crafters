import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProducts } from "../store/allProducts";
import { addToCart } from "../store/cart";
import Search from "./Search";

export class Products extends Component {
  constructor() {
    super();
    this.state = {
      filtered: "All",
      term: "",
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    this.props.getProducts();
  }

  handleChange(event) {
    this.setState({ ...this.state, term: event.target.value });
  }

  handleFilterClick(categoryName) {
    this.setState({ filtered: categoryName });
  }

  render() {
    const { products } = this.props;

    const productFilter = products.filter((product) => {
      if (this.state.filtered === "All") return product;
      if (this.state.filtered === "Track") return product.category === "track";
      if (this.state.filtered === "Tracklocross")
        return product.category === "tracklocross";
      if (this.state.filtered === "Gravel")
        return product.category === "gravel";
      if (this.state.filtered === "Road") return product.category === "road";
    });

    return (
      <section className='grid-section'>
        Bicycles
        <div className='grid-container'>
          <div className='grid-section-left'>
            <Search onSearchChange={(term) => this.setState({ term })} />
            <p className='grid-section-left-category-bold'>Categories</p>
            <ul className='all-categories-list'>
              <li
                className='cat-list'
                onClick={() => {
                  this.handleFilterClick("All");
                }}
                key='cat-all shop-cat'
              >
                All
              </li>
              <li
                className='cat-list'
                onClick={() => {
                  this.handleFilterClick("Track");
                }}
                key='cat-track shop-cat'
              >
                Track
              </li>
              <li
                className='cat-list'
                onClick={() => {
                  this.handleFilterClick("Tracklocross");
                }}
                key='cat-tracklocross shop-cat'
              >
                Tracklocross
              </li>
              <li
                className='cat-list'
                onClick={() => {
                  this.handleFilterClick("Gravel");
                }}
                key='cat-gravel shop-cat'
              >
                Gravel
              </li>
              <li
                className='cat-list'
                onClick={() => {
                  this.handleFilterClick("Road");
                }}
                key='cat-road shop-cat'
              >
                {" "}
                Road
              </li>
            </ul>
          </div>

          <div className='grid-section-right'>
            {productFilter.map((product) =>
              product.name
                .toLowerCase()
                .includes(this.state.term.toLowerCase()) ? (
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
                        onClick={() => {
                          this.props.addToCart(product);
                        }}
                      >
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )
            )}
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  products: state.products,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  getProducts: () => dispatch(fetchProducts()),
  addToCart: (product) => dispatch(addToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
