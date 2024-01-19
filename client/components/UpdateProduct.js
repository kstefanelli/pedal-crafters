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
      <option key={option} value={option.toLowerCase()}>
        {option.charAt(0).toUpperCase() + option.slice(1)}
      </option>
    ));
  };

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
            {name === "category" ? (
              <>
                <option value='' disabled>
                  Choose a category:
                </option>
                {renderOptions(["track", "tracklocross", "gravel", "road"])}
              </>
            ) : null}
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
    updateProduct({ ...product, ...productInfo });
  };

  const handleDelete = () => {
    deleteProduct(match.params.id);
  };

  return (
    <div className='min-h-screen md:min-h-[75vh] flex items-center justify-center px-5'>
      <form onSubmit={handleSubmit} className='max-w-md w-full'>
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center'>
            Update Product
          </h1>

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

          <div className='flex items-center justify-between mt-6'>
            <button
              type='submit'
              className='bg-[#321e1e] text-white p-2 rounded-lg w-full focus:outline-none hover:opacity-70 font-bold'
            >
              Update
            </button>
            <button
              type='button'
              onClick={handleDelete}
              className='bg-[#321e1e] text-white p-2 rounded-lg w-full ml-4 focus:outline-none hover:opacity-70 font-bold'
            >
              Delete
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

const mapStateToProps = (state) => ({
  product: state.singleProduct,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
  updateProduct: (product) => dispatch(updateProduct(product, history)),
  deleteProduct: (id) => dispatch(deleteProduct(id, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);
