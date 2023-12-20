import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchProduct, updateProduct } from "../store/singleProduct"
import { deleteProduct } from "../store/allProducts"

class UpdateProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      name: "",
      imageURL: "",
      price: 0,
      description: "",
      category: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchProduct(id);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.product.id !== this.props.product.id) {
      this.setState({
        name: this.props.product.name || "",
        imageURL: this.props.product.imageURL || "",
        price: parseInt(this.props.product.price) || "",
        description: this.props.product.description || "",
        category: this.props.product.category || "",
      });
    }
  }

  handleChange(event) {
    this.setState({...this.state,
      [event.target.name]: event.target.value,
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.props.updateProduct({ ...this.props.product, ...this.state });
  }
  render() {
    const { name, imageURL, price, description, category } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div className="add-product-form ">
        <form className="add-form-input" onSubmit={handleSubmit}>
          <div className="form update">
            <h1 style={{ textAlign: "center" }}>Update Product</h1>

            <div className="product-info-div">
              <div className="product-info-name">
                <span htmlFor="productName">Product Name</span>
              </div>
              <div className="product-info-input">
                <input
                  name="name"
                  className="product-info-input"
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

            <div className="product-info-div">
              <div className="product-info-name">
                <span htmlFor="productimageURL">Picture</span>
              </div>
              <div className="product-info-input">
                <input
                  name="imageURL"
                  onChange={handleChange}
                  value={imageURL}
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Product picture is a required field",
                      alert("Go back and add a product picture")
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </div>
            </div>

            <div className="product-info-div">
              <div className="product-info-name">
                <span htmlFor="productPrice">Price</span>
              </div>
              <div className="product-info-input">
                <input
                  name="price"
                  onChange={handleChange}
                  value={price}
                  required
                  onInvalid={(e) =>
                    e.target.setCustomValidity(
                      "Product price is a required field",
                      alert("How do you plan to sell a product without a price?")
                    )
                  }
                  onInput={(e) => e.target.setCustomValidity("")}
                />
              </div>
            </div>


            <div className="product-info-div">
              <div className="product-info-name">
                <span htmlFor="productDescription">Description</span>
              </div>
              <div className="product-info-input product-description-input">
                <textarea
                  name="description"
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

            <div className="product-info-div">
              <div className="product-info-name">
                <span htmlFor="productCategory">Category</span>
              </div>
              <div className="cat-cont">
                <select onChange={handleChange} name='category' className="category-list">
                  <option value={category}></option>
                  <option value="track">track</option>
                  <option value="tracklocross">tracklocross</option>
                  <option value="gravel">gravel</option>
                  <option value="road">road</option>
                </select>
              </div>
            </div>
          </div>

          <div className="update-btns">
            <button type="submit">
              Update
            </button>

            <button type="button" onClick={() => {
              this.props.deleteProduct(this.props.match.params.id)
            }}>
              Delete
            </button>

            <Link to="/admin/products">
              <button type="button" className="buttonShadow">
                Cancel
              </button>
            </Link>

          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
    product: state.singleProduct
})
const mapDispatchToProps = (dispatch, { history }) => ({
  fetchProduct: (id) => dispatch(fetchProduct(id)),
  updateProduct: (product) => (dispatch(updateProduct(product, history))),
  deleteProduct: (id) => dispatch(deleteProduct(id, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateProduct);