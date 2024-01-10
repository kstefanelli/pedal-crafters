import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/allUsers";

const tableHeaders = ["firstName", "lastName", "email", "address"];

const UserTableItem = ({ user, isHeader }) => (
  <div
    className={`grid grid-cols-1 md:grid-cols-4 gap-4 border-b ${
      isHeader ? "bg-gray-200" : ""
    }`}
  >
    {tableHeaders.map((header, index) => (
      <div key={index} className={`w-full p-5 ${isHeader ? "font-bold" : ""}`}>
        {isHeader
          ? header.charAt(0).toUpperCase() + header.slice(1)
          : user[header]}
      </div>
    ))}
  </div>
);

const AdminUsers = ({ users, getAllUsers }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);
  return (
    <div className='p-5'>
      <h2 className='pt-5 text-2xl font-bold text-center'>
        Customer Information
      </h2>
      <div className='border border-gray-300 mt-4'>
        {users.map((user, index) => (
          <UserTableItem key={user.id} user={user} isHeader={index === 0} />
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
