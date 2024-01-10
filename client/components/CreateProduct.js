import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../store/allProducts";

const CreateProduct = ({ createProduct, history }) => {
  const [productInfo, setProductInfo] = useState({
    name: "",
    price: 0,
    description: "",
    category: "",
  });

  const handleChange = (event) => {
    setProductInfo({
      ...productInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createProduct(productInfo, history);
  };

  const { name, price, description, category } = productInfo;

  return (
    <div className='add-product-form '>
      <form className='add-form-input' onSubmit={handleSubmit}>
        <div className='form update'>
          <h1 style={{ textAlign: "center" }}>Add Product</h1>

          {[
            { label: "Product Name", name: "name", type: "text" },
            { label: "Price", name: "price", type: "number" },
            { label: "Description", name: "description", type: "textarea" },
            { label: "Category", name: "category", type: "select" },
          ].map((input) => (
            <div className='product-info-div' key={input.name}>
              <div className='product-info-name'>
                <span htmlFor={`product${input.name}`}>{input.label}</span>
              </div>
              <div className='product-info-input'>
                {input.type === "textarea" ? (
                  <textarea
                    name={input.name}
                    onChange={handleChange}
                    value={productInfo[input.name]}
                    required
                    onInvalid={(e) =>
                      e.target.setCustomValidity(
                        `Product ${input.name} is a required field`,
                        alert(`Go back and add a product ${input.name}`)
                      )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
                ) : input.type === "select" ? (
                  <select
                    onChange={handleChange}
                    name={input.name}
                    className='category-list'
                  >
                    <option value={category}></option>
                    <option value='track'>track</option>
                    <option value='tracklocross'>tracklocross</option>
                    <option value='gravel'>gravel</option>
                    <option value='road'>road</option>
                  </select>
                ) : (
                  <input
                    name={input.name}
                    type={input.type}
                    onChange={handleChange}
                    value={productInfo[input.name]}
                    required
                    onInvalid={(e) =>
                      e.target.setCustomValidity(
                        `Product ${input.name} is a required field`,
                        alert(`Go back and add a product ${input.name}`)
                      )
                    }
                    onInput={(e) => e.target.setCustomValidity("")}
                  />
                )}
              </div>
            </div>
          ))}

          <div className='update-btns'>
            <button type='submit'>Add</button>

            <Link to='/admin/products'>
              <button type='button' className='buttonShadow'>
                Cancel
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history }) => ({
  createProduct: (product) => dispatch(createProduct(product, history)),
});

export default connect(null, mapDispatchToProps)(CreateProduct);
