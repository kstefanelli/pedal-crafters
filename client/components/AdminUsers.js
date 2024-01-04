import React, { useEffect } from "react";
import { connect } from "react-redux";
import { fetchUsers } from "../store/allUsers";

const UserTableItem = ({ user, isHeader }) => (
  <tr className={isHeader ? "all-users-content-label" : "all-users-content"}>
    <td className={isHeader ? "table-label-name" : "table-content-name"}>
      {isHeader ? "First name" : user.firstName}
    </td>
    <td className={isHeader ? "table-label-name" : "table-content-name"}>
      {isHeader ? "Last name" : user.lastName}
    </td>
    <td className={isHeader ? "table-label-long" : "table-content-long"}>
      {isHeader ? "Email" : user.email}
    </td>
    <td className={isHeader ? "table-label-long" : "table-content-long"}>
      {isHeader ? "Address" : user.address}
    </td>
  </tr>
);

const AdminUsers = ({ users, getAllUsers }) => {
  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  return (
    <div className='all-users-container'>
      <h2 className='pt-5'>Customer Information</h2>
      <table className='all-users-table'>
        <tbody className='all-users-table-body'>
          <UserTableItem isHeader={true} />
          {users.map((user) => (
            <UserTableItem key={user.id} user={user} />
          ))}
        </tbody>
      </table>
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
