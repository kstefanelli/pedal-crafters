import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateUser, fetchUser } from "../../store/singleUser";

const Input = ({ type, name, label, placeholder, value, onChange }) => (
  <div className='mb-4'>
    <div className='mb-2'>
      <label className='text-xl'>{label}</label>
    </div>
    <input
      className='w-full p-2 border rounded-lg focus:outline-none focus:border-[#321e1e]'
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  </div>
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

  const inputFields = [
    {
      name: "firstName",
      label: "First Name",
      placeholder: "First Name",
      type: "text",
    },
    {
      name: "lastName",
      label: "Last Name",
      placeholder: "Last Name",
      type: "text",
    },
    { name: "email", label: "Email", placeholder: "Email", type: "text" },
    {
      name: "password",
      label: "Password",
      placeholder: "Password",
      type: "password",
    },
    { name: "address", label: "Address", placeholder: "Address", type: "text" },
  ];

  return (
    <div className='min-h-screen md:min-h-[75vh] flex items-center justify-center px-5'>
      <form onSubmit={handleSubmit} className='max-w-md w-full'>
        <div>
          <h1 className='text-xl font-bold mb-4 text-center'>
            Update Information
          </h1>

          {inputFields.map((field) => (
            <Input
              key={field.name}
              type={field.type}
              name={field.name}
              label={field.label}
              placeholder={field.placeholder}
              value={userData[field.name]}
              onChange={handleChange}
            />
          ))}

          <div className='mb-4'>
            <Button
              type='submit'
              label='Submit'
              className='bg-[#321e1e] text-white p-2 rounded-lg focus:outline-none hover:opacity-50 font-bold'
            />
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
