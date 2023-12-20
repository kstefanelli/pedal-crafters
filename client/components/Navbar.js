import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
const Navbar = ({ isLoggedIn, isAdmin }) => {
  const commonItems = [
    { path: "/about", label: "About", show: true },
    { path: "/profile", label: "Profile", show: isLoggedIn },
    { path: "/signin", label: "Sign in", show: !isLoggedIn },
    { path: "/cart", label: "🛒", show: true },
  ];
  const adminItems = [{ path: "/admin", label: "Admin", show: isAdmin }];
  const navItems = isLoggedIn ? [...commonItems, ...adminItems] : commonItems;

  return (
    <div>
      <nav>
        <div className='nav-container'>
          <Link to='/' className='navLink'>
            PedalCrafters
          </Link>
          <div>
            {navItems.map(
              (item, index) =>
                item.show && (
                  <Link key={index} to={item.path} className='navLink'>
                    {item.label}
                  </Link>
                )
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
