import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/singleUser";
import { logout } from "../store";
import OrderHistory from "./OrderHistory";
import { Link } from "react-router-dom";

const UserProfile = ({ firstName, getUser, handleLogout }) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div className='min-h-screen flex flex-col items-center justify-center px-20 pb-10 pt-5'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold mb-4'>Welcome {firstName}!</h2>
        <div className='flex justify-end mb-4 text-sm'>
          <Link to='/profile/update'>
            <button
              type='button'
              className='bg-[#085162] text-white hover:opacity-50 px-4 py-2 rounded-md w-32 h-10'
            >
              Edit Profile
            </button>
          </Link>

          <button
            type='button'
            className='bg-[#085162] text-white hover:opacity-50 px-4 py-2 rounded-md ml-2 w-32 h-10'
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
        <div>
          <OrderHistory />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  firstName: state.auth.firstName,
});

const mapDispatchToProps = {
  getUser: fetchUser,
  handleLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
