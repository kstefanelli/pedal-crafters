import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateUser, fetchUser } from "../store/singleUser";

const Input = ({ type, name, placeholder, value, onChange }) => (
  <input
    className='w-full p-2 mb-4 border rounded-lg focus:outline-none focus:border-[#321e1e]'
    type={type}
    name={name}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

const Button = ({ type, label, className }) => (
  <button className={`w-full ${className} focus:outline-none`} type={type}>
    {label}
  </button>
);

const UpdateUser = ({ user, fetchUser, updateUser, history }) => {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    address: "",
  });

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    setUserData({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      password: user.password || "",
      address: user.address || "",
    });
  }, [user]);

  const handleSubmit = (event) => {
    event.preventDefault();
    updateUser({ ...user, ...userData }, history);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  return (
    <div className='flex items-center justify-center min-h-[75vh] px-6'>
      <form onSubmit={handleSubmit} className='flex flex-col items-center'>
        <div className='flex items-center justify-center'>
          <div>
            <h1 className='text-xl font-bold mb-4'>Update Information</h1>

            <Input
              type='text'
              name='firstName'
              placeholder='First Name'
              value={userData.firstName}
              onChange={handleChange}
            />
            <Input
              type='text'
              name='lastName'
              placeholder='Last Name'
              value={userData.lastName}
              onChange={handleChange}
            />
            <Input
              type='text'
              name='email'
              placeholder='Email'
              value={userData.email}
              onChange={handleChange}
            />
            <Input
              type='password'
              name='password'
              placeholder='Password'
              value={userData.password}
              onChange={handleChange}
            />
            <Input
              type='text'
              name='address'
              placeholder='Address'
              value={userData.address}
              onChange={handleChange}
            />

            <div className='mb-4'>
              <Button
                type='submit'
                label='Submit'
                className='bg-[#321e1e] text-white p-2 rounded-lg focus:outline-none hover:opacity-50 font-bold'
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.singleUser,
});

const mapDispatchToProps = (dispatch) => ({
  fetchUser: () => dispatch(fetchUser()),
  updateUser: (user, history) => dispatch(updateUser(user, history)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateUser);
