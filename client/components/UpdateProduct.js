import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct, updateProduct } from "../store/singleProduct";
import { deleteProduct } from "../store/allProducts";

const InputField = ({
  label,
  name,
  type,
  value,
  handleChange,
  required,
  onInvalid,
}) => {
  const renderOptions = (options) => {
    return options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ));
  };

  return (
    <div className='product-info-div'>
      <div className='product-info-name'>
        <span htmlFor={`product${name}`}>{label}</span>
      </div>
      <div className='product-info-input'>
        {type === "textarea" ? (
          <textarea
            name={name}
            onChange={handleChange}
            value={value}
            required={required}
            onInvalid={onInvalid}
            onInput={(e) => e.target.setCustomValidity("")}
          />
        ) : type === "select" ? (
          <select
            onChange={handleChange}
            name={name}
            className='category-list'
            value={value}
          >
            {name === "category"
              ? renderOptions(["", "track", "tracklocross", "gravel", "road"])
              : null}
          </select>
        ) : (
          <input
            name={name}
            type={type}
            onChange={handleChange}
            value={value}
            required={required}
            onInvalid={onInvalid}
            onInput={(e) => e.target.setCustomValidity("")}
          />
        )}
      </div>
    </div>
  );
};

const UpdateProduct = ({
  product,
  fetchProduct,
  updateProduct,
  deleteProduct,
  match,
  history,
}) => {
  const [productInfo, setProductInfo] = useState({
    name: "",
    imageURL: "",
    price: 0,
    description: "",
    category: "",
  });

  useEffect(() => {
    const { id } = match.params;
    fetchProduct(id);
  }, [fetchProduct, match.params]);

  useEffect(() => {
    if (product.id !== productInfo.id) {
      setProductInfo({
        name: product.name || "",
        imageURL: product.imageURL || "",
        price: parseInt(product.price) || 0,
        description: product.description || "",
        category: product.category || "",
      });
    }
  }, [product, productInfo.id]);

  const handleChange = (event) => {
    setProductInfo({
      ...productInfo,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProduct({ ...product, ...productInfo });
  };

  const handleDelete = () => {
    deleteProduct(match.params.id);
  };

  return (
    <div className='add-product-form '>
      <form className='add-form-input' onSubmit={handleSubmit}>
        <div className='form update'>
          <h1 style={{ textAlign: "center" }}>Update Product</h1>

          {[
            { label: "Product Name", name: "name", type: "text" },
            { label: "Picture", name: "imageURL", type: "text" },
            { label: "Price", name: "price", type: "number" },
            { label: "Description", name: "description", type: "textarea" },
            { label: "Category", name: "category", type: "select" },
          ].map((input) => (
            <InputField
              key={input.name}
              label={input.label}
              name={input.name}
              type={input.type}
              value={productInfo[input.name]}
              handleChange={handleChange}
              required={true}
              onInvalid={(e) =>
                e.target.setCustomValidity(
                  `Product ${input.name} is a required field`,
                  alert(`Go back and add a product ${input.name}`)
                )
              }
            />
          ))}

          <div className='update-btns'>
            <button type='submit'>Update</button>
            <button type='button' onClick={handleDelete}>
              Delete
            </button>
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

const mapStateToProps = (state) => ({
  product: state.singleProduct,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
  updateProduct: (product) => dispatch(updateProduct(product, history)),
  deleteProduct: (id) => dispatch(deleteProduct(id, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
