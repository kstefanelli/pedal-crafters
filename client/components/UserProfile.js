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
    <div className='flex flex-col items-center py-8 px-4 lg:px-6 xl:p-12'>
      <div className='text-center'>
        <h2 className='text-2xl font-bold mb-4'>Welcome {firstName}!</h2>
        <div className='flex justify-center text-sm'>
          <Link to='/profile/update'>
            <button
              type='button'
              className='bg-[#321e1e] text-white hover:opacity-50 px-4 py-2 rounded-md w-32 h-10'
            >
              Edit Profile
            </button>
          </Link>

          <button
            type='button'
            className='bg-[#321e1e] text-white hover:opacity-50 px-4 py-2 rounded-md ml-2 w-32 h-10'
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
