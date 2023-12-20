import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createProduct } from "../store/allProducts";

class CreateProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: 0,
      description: "",
      category: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ ...this.state, [event.target.name]: event.target.value });
    console.log(this.state);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createProduct(this.state);
  }

  render() {
    const { name, price, description, category } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div className='add-product-form '>
        <form className='add-form-input' onSubmit={handleSubmit}>
          <div className='form update'>
            <h1 style={{ textAlign: "center" }}>Add Product</h1>

            <div className='product-info-div'>
              <div className='product-info-name'>
                <span htmlFor='productName'>Product Name</span>
              </div>
              <div className='product-info-input'>
                <input
                  name='name'
                  className='product-info-input'
                  onChange={handleChange}
                  value={name}
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Product name is a required field",
                      alert("Go back and add a product name")
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </div>
            </div>

            <div className='product-info-div'>
              <div className='product-info-name'>
                <span htmlFor='productPrice'>Price</span>
              </div>
              <div className='product-info-input'>
                <input
                  name='price'
                  onChange={handleChange}
                  value={price}
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Product price is a required field",
                      alert(
                        "How do you plan to sell a product without a price?"
                      )
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </div>
            </div>

            <div className='product-info-div'>
              <div className='product-info-name'>
                <span htmlFor='productDescription'>Description</span>
              </div>
              <div className='product-info-input product-description-input'>
                <textarea
                  name='description'
                  onChange={handleChange}
                  value={description}
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Product description is a required field",
                      alert("Go back and add a product description")
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </div>
            </div>

            <div className='product-info-div'>
              <div className='product-info-name'>
                <span htmlFor='productCategory'>Category</span>
              </div>
              <div className='cat-cont'>
                <select
                  onChange={handleChange}
                  name='category'
                  className='category-list'
                >
                  <option value={category}></option>
                  <option value='track'>track</option>
                  <option value='tracklocross'>tracklocross</option>
                  <option value='gravel'>gravel</option>
                  <option value='road'>road</option>
                </select>
              </div>
            </div>
          </div>

          <div className='update-btns'>
            <button type='submit'>Create</button>

            <Link to='/admin/products'>
              <button type='button' className='buttonShadow'>
                Cancel
              </button>
            </Link>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => ({
  createProduct: (product) => dispatch(createProduct(product, history)),
});

export default connect(null, mapDispatchToProps)(CreateProduct);
