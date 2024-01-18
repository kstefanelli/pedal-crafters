import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/allUsers";

const UserGridItem = ({ user, isHeader }) => (
  <div
    className={`grid grid-cols-4 gap-2 text-start items-center text-sm md:text-base xl:text-xl border-b pl-2 font-medium ${
      isHeader ? "bg-gray-200 font-bold" : ""
    }`}
  >
    <div className='col-span-1'>
      {isHeader ? "First Name" : `${user.firstName}`}
    </div>
    <div className='col-span-1'>
      {isHeader ? "Last Name" : `${user.lastName}`}
    </div>
    <div className='col-span-2'>{isHeader ? "Email" : user.email}</div>
  </div>
);

const AdminUsers = ({ users, getAllUsers }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (!users.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className='p-5 lg:px-20'>
      <h2 className='pt-5 text-2xl font-bold text-center'>
        Customer Information
      </h2>
      <div className='border border-gray-300 mt-4'>
        {users.map((user, index) => (
          <UserGridItem key={user.id} user={user} isHeader={index === 0} />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
