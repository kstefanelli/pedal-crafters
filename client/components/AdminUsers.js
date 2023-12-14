import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../store/allUsers';

export class AdminUsers extends Component {
  async componentDidMount() {
    await this.props.getAllUsers();
  }

  render() {
    const users = this.props.users;
    return (
      <div className="all-users-container">
        <h2>Customer Information</h2>
        <table className="all-users-table">
          <tbody className="all-users-table-body">
            <tr className="all-users-content-label">
              <td className="table-label-name">First name</td>
              <td className="table-label-name">Last name</td>
              <td className="table-label-long">Email</td>
              <td className="table-label-long">Address</td>
            </tr>
            {users.map((user) => (
              <tr key={user.id} className="all-users-content">
                <td className="table-content-name">{user.firstName}</td>
                <td className="table-content-name">{user.lastName} </td>
                <td className="table-content-long">{user.email} </td>
                <td className="table-content-long">{user.address} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  getAllUsers: () => dispatch(fetchUsers()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminUsers);
