import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/singleUser";
import { logout } from "../store";
import OrderHistory from "./OrderHistory";
import { Link } from "react-router-dom";

const UserProfile = ({ firstName, getUser, handleLogout, allOrders }) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className='profile-container'>
      <h2 className='profile-heading pt-4'>Welcome {firstName}!</h2>
      <div className='profile-btn-container'>
        <Link to='/profile/update'>
          <button type='button' className='update-profile'>
            Update profile
          </button>
        </Link>
        <button type='button' className='update-profile' onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className='profile-order-container'>
        <OrderHistory />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  allOrders: state.orders,
  firstName: state.auth.firstName,
});

const mapDispatchToProps = {
  getUser: fetchUser,
  handleLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
