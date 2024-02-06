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

  const dropdownStyles =
    "bg-[#f4f1e0] rounded-md shadow-lg py-2 mt-1 flex flex-col z-10 lg:right-12 lg:min-w-[150px]";
  const buttonStyles =
    "font-bold hover:text-[#FFA364] transition duration-500 hover:underline hover:decoration-2 text-2xl lg:text-xl relative z-10 m-0";
  const linkStyles =
    "px-4 py-2 font-bold text-[#321E1E] text-lg hover:text-[#FFA364] transition duration-500 hover:underline hover:decoration-2";

  return (
    <div
      className='relative inline-block'
      onMouseEnter={toggleDropdown}
      onMouseLeave={hideDropdown}
    >
      <button className={buttonStyles} onClick={toggleDropdown}>
        ACCOUNT
      </button>
      <div className='hidden lg:block'>
        <div
          className={`${
            isDropdownVisible ? "block" : "hidden"
          } ${dropdownStyles} text-start`}
          style={{ position: "absolute" }}
        >
          {dropdownLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={handleDropdownItemClick}
              className={linkStyles}
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
                  className={linkStyles}
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
            className='text-start font-bold px-4 py-2 text-[#321E1E] text-lg hover:text-[#FFA364] transition duration-500 hover:underline hover:decoration-2'
          >
            LOG OUT
          </button>
        </div>
      </div>
      <div className='lg:hidden'>
        <div
          className={`${
            isDropdownVisible ? "block" : "hidden"
          } ${dropdownStyles}`}
        >
          {dropdownLinks.map((link, index) => (
            <Link
              key={index}
              to={link.to}
              onClick={handleDropdownItemClick}
              className={linkStyles}
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
                  className={linkStyles}
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
            className='font-bold px-4 py-2 text-[#321E1E] text-lg hover:text-[#FFA364] transition duration-500 hover:underline hover:decoration-2'
          >
            LOG OUT
          </button>
        </div>
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
