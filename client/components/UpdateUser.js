import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUser, fetchUser } from '../store/singleUser'

export class UpdateUser extends Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      address: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchUser()
  }

  componentDidUpdate(prevProps) {
    if (prevProps.user.id !== this.props.user.id) {
      this.setState({
        firstName: this.props.user.firstName || "",
        lastName: this.props.user.lastName || "",
        email: this.props.user.email || "",
        password: this.props.user.password || "",
        address: this.props.user.address || "",
      });
    }
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.updateUser({...this.props.user, ...this.state});
  }

  handleChange(event){
    this.setState({[event.target.name]: event.target.value
    })
  }
  render() {
    return (
      <div className="add-product-form ">
        <form onSubmit={this.handleSubmit} className="add-form-input">
          <div className="form update">
          <h1 style={{ textAlign: "center" }}>Update Information</h1>

            <div className="product-info-div">
              <div className="product-info-name" htmlFor="firstName">
                <p className="productName">First name</p>
              </div>
              <div className="product-info-input">
                <input
                  className="product-info-input"
                  type="name"
                  name="firstName"
                  onChange={this.handleChange}
                  value={this.state.firstName}
                />
              </div>
            </div>

            <div className="product-info-div">
              <div className="product-info-name" htmlFor="lastName">
                <p className="productName">Last name</p>
              </div>
              <div className="product-info-input">
                <input
                  className="product-info-input"
                  type="name"
                  name="lastName"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                />
              </div>
            </div>

            <div className="product-info-div">
              <div className="product-info-name" htmlFor="email">
                <p className="productName">Email</p>
              </div>
              <div className="product-info-input">
                <input
                  className="product-info-input"
                  type="text"
                  name="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </div>
            </div>

            <div className="product-info-div">
              <div htmlFor="password" className="product-info-name">
                <p className="productName">Password</p>
              </div>
              <div className="product-info-input">
                <input
                  className="product-info-input"
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              </div>
            </div>

            <div className="product-info-div">
              <div htmlFor="address" className="product-info-name">
                <p className="productName">Address</p>
              </div>
              <div className="product-info-input">
                <input
                  className="product-info-input"
                  type="address"
                  name="address"
                  onChange={this.handleChange}
                  value={this.state.address}
                />
              </div>
            </div>
            <div className="update-btns">
              <button type="submit">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    user: state.singleUser
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    fetchUser: () => dispatch(fetchUser()),
    updateUser: (user) => dispatch(updateUser(user, history)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser)