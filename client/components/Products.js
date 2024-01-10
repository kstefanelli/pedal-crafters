import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { fetchProducts } from "../store/allProducts";
import { addToCart } from "../store/cart";
import ProductItem from "./ProductItem";
import CategorySearch from "./CategorySearch";

const Products = ({ products, getProducts, addToCart }) => {
  const [filtered, setFiltered] = useState("All");
  const [term, setTerm] = useState("");

  useEffect(() => {
    getProducts();
  }, [getProducts]);

  const handleFilterClick = (categoryName) => {
    setFiltered(categoryName);
  };

  const filterProducts = (product, category) => {
    if (category === "All") return true;
    return product.category === category.toLowerCase();
  };

  const productFilter = products.filter((product) =>
    filterProducts(product, filtered)
  );

  return (
    <section className='mx-auto p-7 lg:p-14'>
      <div className='grid grid-cols-3 lg:grid-cols-4 space-x-4'>
        <div className='col-span-1'>
          <CategorySearch
            onSearchChange={(term) => setTerm(term)}
            onFilterClick={handleFilterClick}
            filtered={filtered}
          />
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 col-span-2 lg:col-span-3'>
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

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(fetchProducts()),
  addToCart: (product) => dispatch(addToCart(product)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
