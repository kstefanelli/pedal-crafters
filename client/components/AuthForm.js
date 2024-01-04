import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../store";

const Input = ({ type, name, placeholder, required }) => (
  <input
    className='w-full p-2 mb-4 border rounded'
    type={type}
    name={name}
    placeholder={placeholder}
    required={required}
  />
);

const Button = ({ type, label, className }) => (
  <button className={`w-full ${className}`} type={type}>
    {label}
  </button>
);

const AuthForm = ({ name, displayName, handleSubmit, error }) => {
  return (
    <div className='form div-container lg:p-14'>
      <form onSubmit={handleSubmit} name={name}>
        <div className='login'>
          <div className='login-card'>
            <p className='title'>Sign in</p>
            <Input name='email' placeholder='Email' required />
            <Input
              name='password'
              placeholder='Password'
              type='password'
              required
            />
            <Button
              type='submit'
              label='Sign in'
              className='bg-[#085162] text-white p-2 rounded hover:opacity-50'
            />
            <p className='text'>Don't have an account?</p>
            <Link to='/register'>
              <Button
                type='submit'
                label='Create new account'
                className='bg-[#085162] text-white p-2 rounded hover:opacity-50'
              />
            </Link>
          </div>
        </div>
        {error && <div className='text-red-500'> {error} </div>}
      </form>
    </div>
  );
};

const mapSignIn = (state) => ({
  name: "signIn",
  displayName: "SignIn",
  error: state.auth.error,
});

const mapRegister = (state) => ({
  name: "register",
  displayName: "Register",
  error: state.auth.error,
});

const mapDispatch = (dispatch) => ({
  handleSubmit(evt) {
    evt.preventDefault();
    const formName = evt.target.name;
    const email = evt.target.email.value;
    const password = evt.target.password.value;
    dispatch(authenticate(email, password, formName));
  },
});

export const SignIn = connect(mapSignIn, mapDispatch)(AuthForm);
export const Register = connect(mapRegister, mapDispatch)(AuthForm);
