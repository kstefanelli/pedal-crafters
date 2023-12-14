import React from 'react';
import { connect } from 'react-redux';
import { createUser } from '../store/allUsers';

export class CreateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      ...this.state,
      [event.target.name]: event.target.value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.createUser(this.state);
  }
  render() {
    return (
      <div className="create-form form div-container">
        <form onSubmit={this.handleSubmit}>
          <div className="form-container signup">
            <div className="signup-card">
              <p className="title">Register</p>
              <div className="input-container">
                <label className="labelName">
                  <input
                    className="input"
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    onChange={this.handleChange}
                    value={this.state.firstName}
                  />
                </label>
              </div>

              <div className="input-container">
                <label className="labelName">
                  <input
                    className="input"
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    onChange={this.handleChange}
                    value={this.state.lastName}
                  />
                </label>
              </div>

              <div className="input-container">
                <label className="labelName">
                  <input
                    className="input"
                    type="text"
                    name="email"
                    placeholder="Email"
                    onChange={this.handleChange}
                    value={this.state.email}
                  />
                </label>
              </div>

              <div className="input-container">
                <label className="labelName">
                  <input
                    className="input"
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={this.state.password}
                  />
                </label>
              </div>
              <div>
                <button className="button submit-btn" type="submit">
                  Create Account
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createUser: (props) => dispatch(createUser(props, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreateUser);
