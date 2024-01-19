import React, { useState } from "react";
import { connect } from "react-redux";
import { createUser } from "../store/allUsers";

const Input = ({ type, name, placeholder, value, onChange }) => (
  <input
    className='w-full p-2 mb-4 border rounded-lg focus:outline-none focus:border-[#321e1e]'
    type={type}
    name={name}
    placeholder={placeholder}
    required
    value={value}
    onChange={onChange}
  />
);

const Button = ({ onClick, type, label, className }) => (
  <button className={`${className}`} type={type} onClick={onClick}>
    {label}
  </button>
);

const renderInput = (field, value, onChange) => (
  <div key={field} className='mb-4'>
    <label className='labelName'>
      <Input
        type={field === "password" ? "password" : "text"}
        name={field}
        placeholder={
          field === "firstName"
            ? "First Name"
            : field === "lastName"
            ? "Last Name"
            : field === "email"
            ? "Email"
            : "Password"
        }
        onChange={onChange}
        value={value}
      />
    </label>
  </div>
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
    <div className='flex items-center justify-center p-4 min-h-[75vh]'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-col items-center p-4'>
          <p className='text-lg font-bold mb-4'>Register</p>

          {["firstName", "lastName", "email", "password"].map((field) =>
            renderInput(field, formData[field], handleChange)
          )}
          <Button
            type='submit'
            label='Create Account'
            className='rounded-lg bg-[#321e1e] p-2 w-full text-base font-bold text-white border-none cursor-pointer transition duration-200 hover:bg-opacity-50'
          />

          <div></div>
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
