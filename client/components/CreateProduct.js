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
    imageURL: "",
  });

  const InputField = ({
    label,
    name,
    type,
    value,
    handleChange,
    required,
    onInvalid,
  }) => {
    const categoryOptions = ["track", "tracklocross", "gravel", "road"];

    return (
      <div className='mb-4'>
        <div className='mb-2'>
          <label className='text-xl'>{label}</label>
        </div>
        <div className='w-full'>
          {type === "textarea" ? (
            <textarea
              name={name}
              onChange={handleChange}
              value={value}
              required={required}
              onInvalid={onInvalid}
              onInput={(e) => e.target.setCustomValidity("")}
              className='w-full p-2 h-32 bg-white border rounded-lg focus:outline-none focus:border-[#321e1e]'
            />
          ) : type === "select" ? (
            <select
              onChange={handleChange}
              name={name}
              className='w-full p-2 border rounded-lg focus:outline-none focus:border-[#321e1e]'
              value={value}
            >
              <option value='' disabled>
                Choose a category:
              </option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
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
              className='w-full p-2 border rounded-lg focus:outline-none focus:border-[#321e1e]'
            />
          )}
        </div>
      </div>
    );
  };

  const labels = [
    { label: "Product Name", name: "name", type: "text" },
    { label: "Image URL", name: "imageURL", type: "text" },
    { label: "Price", name: "price", type: "number" },
    { label: "Description", name: "description", type: "textarea" },
    { label: "Category", name: "category", type: "select" },
  ];

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

  return (
    <div className='min-h-screen md:min-h-[75vh] flex items-center justify-center px-5'>
      <form onSubmit={handleSubmit} className='max-w-md w-full'>
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center'>Add Product</h1>

          {labels.map((input) => (
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

          <div className='flex items-center justify-center mt-6'>
            <button
              type='submit'
              className='bg-[#321e1e] text-white p-2 rounded-lg w-full focus:outline-none hover:opacity-70 font-bold'
            >
              Add
            </button>
          </div>
          <Link to='/admin/products'>
            <button
              type='button'
              className='bg-[#321e1e] text-white p-2 rounded-lg w-full mt-4 focus:outline-none hover:opacity-70 font-bold'
            >
              Cancel
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history }) => ({
  createProduct: (product) => dispatch(createProduct(product, history)),
});

export default connect(null, mapDispatchToProps)(CreateProduct);
