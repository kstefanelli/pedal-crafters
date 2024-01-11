import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../store/allUsers";

const buttonStyles =
  "border rounded-lg bg-[#085162] text-white hover:opacity-50 h-10 w-full px-6 text-base focus:outline-none transition duration-200";

export const Admin = () => {
  return (
    <div className='flex flex-col items-center text-center pt-32'>
      <h2 className='text-2xl font-bold'>Admin Dashboard:</h2>
      <div className='flex flex-col items-center space-y-4 mt-8'>
        <Link to='/admin/users'>
          <button className={buttonStyles}>View All Users</button>
        </Link>
        <Link to='/admin/products'>
          <button className={buttonStyles}>Edit Products</button>
        </Link>
        <Link to='/products/add'>
          <button className={buttonStyles}>Add Products</button>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  state: state.allUsers,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Admin);
