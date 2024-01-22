import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { authenticate } from "../store";

const Input = ({ type, name, placeholder, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <>
      <input
        className='w-full p-2 mb-4 border rounded-lg focus:outline-none focus:border-[#321e1e]'
        type={showPassword ? "text" : type}
        name={name}
        placeholder={placeholder}
        required={required}
      />
      {type === "password" && (
        <div className='flex items-center'>
          <input
            type='checkbox'
            onChange={togglePasswordVisibility}
            className='mx-2 mb-4 cursor-pointer'
          />
          <p className='mb-4'> Show Password </p>
        </div>
      )}
    </>
  );
};

const Button = ({ type, label, className }) => (
  <button className={`w-full ${className} focus:outline-none`} type={type}>
    {label}
  </button>
);

const AuthForm = ({ name, displayName, handleSubmit, error }) => {
  return (
    <div className='flex items-center text-center justify-center min-h-[75vh] px-6'>
      <form
        onSubmit={handleSubmit}
        name={name}
        className='flex flex-col items-center'
      >
        <div className='flex items-center justify-center'>
          <div>
            <p className='text-xl font-bold mb-4'>{displayName}</p>
            <Input name='email' placeholder='Email' required />
            <Input
              name='password'
              placeholder='Password'
              type='password'
              required
            />
            <Button
              type='submit'
              label={displayName}
              className='bg-[#321e1e] text-white p-2 rounded-lg hover:opacity-50'
            />
            <p className='text my-4'>Don't have an account?</p>
            <Link to={name === "signIn" ? "/register" : "/signin"}>
              <Button
                type='submit'
                label={name === "signIn" ? "Create new account" : "Sign In"}
                className='bg-[#321e1e] text-white p-2 rounded-lg hover:opacity-50'
              />
            </Link>
          </div>
        </div>
        {error && <div className='text-red-500 mt-4'>{error}</div>}
      </form>
    </div>
  );
};

const mapSignIn = (state) => ({
  name: "signIn",
  displayName: "Sign In",
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
