import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../../store/auth";
import { fetchCart } from "../../store/cart";
import useMediaQuery from "../../hooks/useMediaQuery";
import { titleMap } from "../../utility/titleMap";
import { getNavbarConfig } from "../../config/NavbarConfig";
import ProfileDropdown from "./ProfileDropdown";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const generateLink = ({
  page,
  selectedPage,
  setSelectedPage,
  onClick,
  label,
  fetchCart,
}) => {
  const lowerCasePage = page.toLowerCase();

  const handleClick = () => {
    setSelectedPage(lowerCasePage);
    onClick();
    scrollToTop();
    fetchCart();
  };

  const linkContent = label === "ACCOUNT" ? <ProfileDropdown /> : label;
  return label === "ACCOUNT" ? (
    <span aria-label={`Link to the ${page === "" ? "Home" : label} page`}>
      {linkContent}
    </span>
  ) : (
    <Link
      to={page === "" ? "/" : `/${page}`}
      className={`${
        selectedPage === lowerCasePage ||
        (selectedPage === "Home" && lowerCasePage === "")
          ? "text-[#FFA364] underline underline-offset-4 decoration-2 font-bold"
          : "text-[#321E1E] font-bold"
      } hover:text-[#FFA364] transition duration-500 hover:underline hover:underline-offset-4 hover:decoration-2 text-2xl lg:text-xl`}
      aria-label={`Link to the ${page === "" ? "Home" : label} page`}
      onClick={handleClick}
    >
      {linkContent}
    </Link>
  );
};

const Navbar = ({ isLoggedIn, cart, fetchCart }) => {
  const [selectedPage, setSelectedPage] = useState("Home");
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const location = useLocation();

  const { commonItems } = getNavbarConfig(isLoggedIn, cart);
  const navItems = [...commonItems.filter((item) => item.show)];

  useEffect(() => {
    fetchCart();
    const pathname = location.pathname;
    const currentPage = pathname === "/" ? "Home" : pathname.substring(1);
    const isProductRoute = pathname.match(/^\/products\/\d+(\/update)?/);
    document.title =
      titleMap[isProductRoute ? "products/update" : currentPage] ||
      "404 Not Found - Pedal Crafters";

    setSelectedPage(currentPage);
  }, [location.pathname, selectedPage, fetchCart, cart.totalQuantity]);

  useEffect(() => {
    setIsMenuToggled(false);
    setSelectedPage((prev) => prev);
    if (cart.totalQuantity > 0) {
      fetchCart();
    }
  }, [cart.totalQuantity, selectedPage, fetchCart]);

  useEffect(() => {
    document.documentElement.classList.toggle("mobile-nav-open", isMenuToggled);
    document.documentElement.classList.toggle("overflow-hidden", isMenuToggled);

    return () => {
      document.documentElement.classList.remove(
        "mobile-nav-open",
        "overflow-hidden"
      );
    };
  }, [isMenuToggled]);

  return (
    <nav data-nosnippet className='bg-[#f4f1e0] z-40 w-full sticky top-0 py-5'>
      <div className='flex items-center justify-between mx-auto px-7 lg:px-10 xl:px-14'>
        <h4 className={`text-2xl font-semibold ${isMenuToggled ? "z-50" : ""}`}>
          <Link
            to='/'
            aria-label='Pedal Crafters Logo'
            className='hover:text-[#FFA364] transition duration-500 text-[#321E1E] items-start'
            onClick={() => {
              scrollToTop();
              setIsMenuToggled(false);
            }}
          >
            PEDALCRAFTERS
          </Link>
        </h4>
        {isDesktop ? (
          <div className='flex gap-8'>
            {navItems.map((item, index) => (
              <React.Fragment key={index}>
                {generateLink({
                  page: item.path === "/" ? "" : item.path.substring(1),
                  selectedPage,
                  setSelectedPage,
                  label: item.label,
                  onClick: () => setIsMenuToggled(false),
                  fetchCart,
                })}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div>
            <button
              onClick={() => {
                setIsMenuToggled(!isMenuToggled);
              }}
              aria-label='menu-icon'
            >
              <img
                alt='menu-icon'
                src='/assets/menu-icon.svg'
                width='24'
                height='24'
              />
            </button>
          </div>
        )}
        {!isDesktop && (
          <div
            className={`transition-transform transform duration-500 ${
              isMenuToggled ? "translate-x-0" : "translate-x-full"
            } fixed top-0 right-0 min-h-[100vh] bg-[#f4f1e0] w-screen`}
          >
            <div className='flex justify-end py-6 mx-auto w-5/6'>
              <button
                onClick={() => {
                  setIsMenuToggled(!isMenuToggled);
                }}
                aria-label='close-icon'
              >
                <img
                  alt='close-icon'
                  src='/assets/close-icon.svg'
                  width='24'
                  height='24'
                />
              </button>
            </div>
            <div className='flex flex-col text-center gap-6 justify-center min-h-[75vh]'>
              {navItems.map((item, index) => (
                <React.Fragment key={index}>
                  {generateLink({
                    page: item.path === "/" ? "" : item.path.substring(1),
                    selectedPage,
                    setSelectedPage,
                    label: item.label,
                    onClick: () => setIsMenuToggled(false),
                    fetchCart,
                  })}
                </React.Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleCartLinkClick() {
      dispatch(logout());
    },
    fetchCart: () => dispatch(fetchCart()),
    handleLogout: logout,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
