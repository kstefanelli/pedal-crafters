import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { authenticate } from '../store';

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const { name, displayName, handleSubmit, error } = props;
  console.log(props);
  return (
    <div className="form div-container ">
      <form onSubmit={handleSubmit} name={name}>
        <div className="login">
          <div className="login-card">
            <p className="title">Sign in</p>
            <input name="email" placeholder="Email" required />
            <input
              name="password"
              placeholder="Password"
              type="password"
              required
            />
            <button className="loader">Sign in</button>
            <p className="text">Don't have an account?</p>
            <Link to="/register">
              <button className="buttonShadow" type="submit">
                Create new account
              </button>
            </Link>
          </div>
        </div>
        {error && <div> {error} </div>}
      </form>
    </div>
  );
};

const mapSignIn = (state) => {
  return {
    name: 'signIn',
    displayName: 'SignIn',

    error: state.auth.error,
  };
};

const mapRegister = (state) => {
  return {
    name: 'register',
    displayName: 'Register',
    error: state.auth.error,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit(evt) {
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(authenticate(email, password, formName));
    },
  };
};

export const SignIn = connect(mapSignIn, mapDispatch)(AuthForm);

export const Register = connect(mapRegister, mapDispatch)(AuthForm);
