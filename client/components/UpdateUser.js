import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { updateUser, fetchUser } from "../store/singleUser";

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
    setUserData({
      ...userData,
      [event.target.name]: event.target.value,
    });
  };

  const renderInput = (name) => (
    <div className='product-info-div' key={name}>
      <div className='product-info-name'>
        <p className='productName'>
          {name.charAt(0).toUpperCase() + name.slice(1)}
        </p>
      </div>
      <div className='product-info-input'>
        <input
          className='product-info-input'
          type={name === "password" ? "password" : "text"}
          name={name}
          onChange={handleChange}
          value={userData[name]}
        />
      </div>
    </div>
  );

  return (
    <div className='add-product-form '>
      <form onSubmit={handleSubmit} className='add-form-input'>
        <div className='form update'>
          <h1 style={{ textAlign: "center" }}>Update Information</h1>

          {["firstName", "lastName", "email", "password", "address"].map(
            renderInput
          )}

          <div className='update-btns'>
            <button type='submit'>Submit</button>
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
