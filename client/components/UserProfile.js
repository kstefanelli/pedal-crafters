import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUser } from "../store/singleUser";
import { logout } from "../store";
import { Link } from "react-router-dom";

const UserProfile = ({ firstName, isAdmin, user, getUser, handleLogout }) => {
  useEffect(() => {
    getUser();
  }, [getUser]);

  const profileLabels = ["First Name", "Last Name", "Email", "Address"];
  const userInfo = ["firstName", "lastName", "email", "address"];

  return (
    <>
      <div className='flex flex-col items-center py-2 px-4 lg:px-6 xl:px-12 min-h-[75vh] justify-center'>
        <div className='text-center'>
          <h2 className='text-2xl font-bold mb-4'>Welcome {firstName}!</h2>

          <div className='mt-6 flex flex-col items-center'>
            <div className='text-center'>
              {profileLabels.map((profileLabel, index) => (
                <div
                  className='grid grid-cols-2 justify-center gap-2 text-start items-center text-xl'
                  key={index}
                >
                  <p className='font-bold'>{profileLabel}:</p>
                  <p>{user[userInfo[index]]}</p>
                </div>
              ))}
            </div>
          </div>

          {isAdmin ? (
            <>
              <div className='grid grid-cols-2 justify-center mt-6 gap-2 w-full'>
                <Link to='/wishlist'>
                  <button
                    type='button'
                    className='bg-[#321e1e] text-white p-2 rounded-lg w-full focus:outline-none hover:opacity-70 font-bold'
                  >
                    Wishlist
                  </button>
                </Link>
                <Link to='/users/orders'>
                  <button
                    type='button'
                    className='bg-[#321e1e] text-white p-2 rounded-lg w-full focus:outline-none hover:opacity-70 font-bold'
                  >
                    Order History
                  </button>
                </Link>
                <Link to='/profile/update'>
                  <button
                    type='button'
                    className='bg-[#321e1e] text-white p-2 rounded-lg w-full focus:outline-none hover:opacity-70 font-bold'
                  >
                    Edit Profile
                  </button>
                </Link>
                <Link to='/admin/users'>
                  <button
                    type='button'
                    className='bg-[#321e1e] text-white p-2 rounded-lg w-full focus:outline-none hover:opacity-70 font-bold'
                  >
                    View All Users
                  </button>
                </Link>
                <Link to='/admin/products'>
                  <button
                    type='button'
                    className='bg-[#321e1e] text-white p-2 rounded-lg w-full focus:outline-none hover:opacity-70 font-bold'
                  >
                    Edit Products
                  </button>
                </Link>
                <Link to='/products/add'>
                  <button
                    type='button'
                    className='bg-[#321e1e] text-white p-2 rounded-lg w-full focus:outline-none hover:opacity-70 font-bold'
                  >
                    Add Product
                  </button>
                </Link>
              </div>
              <button
                type='button'
                className='bg-[#321e1e] text-white p-2 rounded-lg w-full focus:outline-none hover:opacity-70 font-bold mt-4'
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <div className='grid grid-cols-2 justify-center mt-6 gap-2 w-full'>
                <Link to='/wishlist'>
                  <button
                    type='button'
                    className='bg-[#321e1e] text-white p-2 rounded-lg w-full focus:outline-none hover:opacity-70 font-bold'
                  >
                    Wishlist
                  </button>
                </Link>
                <Link to='/users/orders'>
                  <button
                    type='button'
                    className='bg-[#321e1e] text-white p-2 rounded-lg w-full focus:outline-none hover:opacity-70 font-bold'
                  >
                    Order History
                  </button>
                </Link>
                <Link to='/profile/update'>
                  <button
                    type='button'
                    className='bg-[#321e1e] text-white p-2 rounded-lg w-full focus:outline-none hover:opacity-70 font-bold'
                  >
                    Edit Profile
                  </button>
                </Link>
                <button
                  type='button'
                  className='bg-[#321e1e] text-white p-2 rounded-lg w-full focus:outline-none hover:opacity-70 font-bold'
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  firstName: state.auth.firstName,
  isAdmin: !!state.auth.isAdmin,
  user: state.singleUser,
});

const mapDispatchToProps = {
  getUser: fetchUser,
  handleLogout: logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
