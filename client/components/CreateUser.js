import React, { useState } from "react";
import { connect } from "react-redux";
import { createUser } from "../store/allUsers";

const Input = ({ type, name, placeholder, value, onChange }) => (
  <input
    className='w-full p-2 mb-4 border rounded focus:outline-none focus:border-blue-500'
    type={type}
    name={name}
    placeholder={placeholder}
    required
    value={value}
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
    <div className='create-form form div-container'>
      <form onSubmit={handleSubmit}>
        <div className='form-container signup'>
          <div className='signup-card'>
            <p className='title'>Register</p>

            {["firstName", "lastName", "email", "password"].map((field) => (
              <div key={field} className='input-container'>
                <label className='labelName'>
                  <Input
                    type={field === "password" ? "password" : "text"}
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    onChange={handleChange}
                    value={formData[field]}
                  />
                </label>
              </div>
            ))}

            <div>
              <Button
                type='submit'
                label='Create Account'
                className='bg-[#321e1e] text-white p-2 rounded hover:opacity-50'
              />
            </div>
          </div>
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
