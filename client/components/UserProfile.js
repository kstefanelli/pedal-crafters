import React from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../store/singleUser';
import { logout } from '../store';
import OrderHistory from './OrderHistory';
import { Link } from 'react-router-dom';

export class UserProfile extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUser();
  }

  render() {
    return (
      <div className="profile-container ">
        <h2 className="profile-heading">Welcome {this.props.firstName}!</h2>
        <div className="profile-btn-container">
          <Link to="/profile/update">
            <button type="button" className="update-profile">
              Update profile
            </button>
          </Link>
          <button
            type="button"
            className="update-profile"
            onClick={this.props.handleLogout}
          >
            Logout
          </button>
        </div>
        <div className="profile-order-container">
          <OrderHistory />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allOrders: state.orders,
  firstName: state.auth.firstName,
});

const mapDispatchToProps = (dispatch) => ({
  getUser: () => dispatch(fetchUser()),
  handleLogout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
