import React, { useState } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUser } from "../../store/singleUser";
import { logout } from "../../store";
const ProfileDropdown = ({ handleLogout, isAdmin }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible((prevVisible) => !prevVisible);
  };

  const hideDropdown = () => {
    setIsDropdownVisible(false);
  };

  const handleDropdownItemClick = () => {
    hideDropdown();
  };

  const dropdownLinks = [
    { to: "/profile", text: "VIEW PROFILE" },
    { to: "/profile/update", text: "EDIT PROFILE" },
    { to: "/users/orders", text: "ORDER HISTORY" },
  ];

  const adminLinks = [
    { to: "/admin/users", text: "VIEW USERS" },
    { to: "/admin/products", text: "EDIT PRODUCTS" },
    { to: "/products/add", text: "ADD PRODUCTS" },
  ];

  return (
    <div
      className='relative inline-block'
      onMouseEnter={toggleDropdown}
      onMouseLeave={hideDropdown}
    >
      <button
        className='font-bold hover:text-[#FFA364] transition duration-500 hover:underline hover:underline-offset-4 hover:decoration-2 text-2xl lg:text-xl'
        style={{ margin: 0, position: "relative", zIndex: 10 }}
        onClick={toggleDropdown}
      >
        ACCOUNT
      </button>
      <div
        className={`${
          isDropdownVisible ? "block" : "hidden"
        } absolute bg-[#f4f1e0] rounded-md shadow-lg py-2 mt-1 flex flex-col text-start`}
        style={{ right: 75, position: "absolute", zIndex: 10 }}
      >
        {dropdownLinks.map((link, index) => (
          <Link
            key={index}
            to={link.to}
            onClick={handleDropdownItemClick}
            className={`px-4 py-2 font-bold text-[#321E1E] text-lg hover:text-[#FFA364] transition duration-500 hover:underline hover:underline-offset-4 hover:decoration-2`}
          >
            {link.text}
          </Link>
        ))}
        {isAdmin && (
          <>
            {adminLinks.map((link, index) => (
              <Link
                key={index}
                to={link.to}
                onClick={handleDropdownItemClick}
                className={`px-4 py-2 font-bold text-[#321E1E] text-lg hover:text-[#FFA364] transition duration-500 hover:underline hover:underline-offset-4 hover:decoration-2`}
              >
                {link.text}
              </Link>
            ))}
          </>
        )}
        <button
          type='button'
          onClick={() => {
            handleLogout();
            handleDropdownItemClick();
          }}
          className={`text-start font-bold px-4 py-2 text-[#321E1E] text-lg hover:text-[#FFA364] transition duration-500 hover:underline hover:underline-offset-4 hover:decoration-2`}
        >
          LOG OUT
        </button>
      </div>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDropdown);
