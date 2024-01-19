import React, { useState } from "react";
import { connect } from "react-redux";
import { createUser } from "../store/allUsers";

const Input = ({ type, name, placeholder, required, onChange }) => (
  <input
    className='w-full p-2 mb-4 border rounded-lg focus:outline-none focus:border-[#321e1e]'
    type={type}
    name={name}
    placeholder={placeholder}
    required={required}
    onChange={onChange}
  />
);

const Button = ({ onClick, type, label, className }) => (
  <button
    className={`w-full ${className} focus:outline-none`}
    type={type}
    onClick={onClick}
  >
    {label}
  </button>
);

const CreateUser = ({ createUser, history }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createUser(formData, history);
  };

  return (
    <div className='flex items-center justify-center text-center min-h-[75vh] px-6'>
      <form onSubmit={handleSubmit} className='w-full max-w-md'>
        <div className='mb-4'>
          <p className='text-xl font-bold mb-4'>Register</p>
          <Input
            type='text'
            name='firstName'
            placeholder='First Name'
            onChange={handleChange}
            required
          />
          <Input
            type='text'
            name='lastName'
            placeholder='Last Name'
            onChange={handleChange}
            required
          />
          <Input
            type='text'
            name='email'
            placeholder='Email'
            onChange={handleChange}
            required
          />
          <Input
            type='password'
            name='password'
            placeholder='Password'
            onChange={handleChange}
            required
          />
          <Button
            type='submit'
            label='Create Account'
            className='rounded-lg bg-[#321e1e] p-2 text-base font-bold text-white border-none cursor-pointer transition duration-200 hover:bg-opacity-50'
          />
        </div>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createUser: (formData) => dispatch(createUser(formData, history)),
  };
};

export default connect(null, mapDispatchToProps)(CreateUser);
