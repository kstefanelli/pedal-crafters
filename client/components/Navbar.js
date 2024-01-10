import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { logout } from "../store";
import { fetchCart } from "../store/cart";
import useMediaQuery from "../hooks/useMediaQuery";

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const CustomLink = ({
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

  return (
    <Link
      to={page === "" ? "/" : `/${page}`}
      className={`${
        selectedPage === lowerCasePage ||
        (selectedPage === "Home" && lowerCasePage === "")
          ? "text-orange-400 underline underline-offset-4 decoration-2"
          : "text-white"
      } hover:text-orange-400 transition duration-500 hover:underline hover:underline-offset-4 hover:decoration-2`}
      aria-label={`Link to the ${page === "" ? "Home" : label} page`}
      onClick={handleClick}
    >
      {label}
    </Link>
  );
};

const Navbar = ({ isLoggedIn, isAdmin, cart, fetchCart }) => {
  const [selectedPage, setSelectedPage] = useState("Home");
  const [isMenuToggled, setIsMenuToggled] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const location = useLocation();

  useEffect(() => {
    fetchCart();
  }, [fetchCart, cart.totalQuantity]);

  const commonItems = [
    { path: "/products", label: "Products", show: true },
    { path: "/profile", label: "Profile", show: isLoggedIn },
    { path: "/signin", label: "Sign in", show: !isLoggedIn },
    {
      path: "/cart",
      label: `Cart${cart.totalQuantity ? ` (${cart.totalQuantity})` : ""}`,
      show: true,
    },
  ];

  const adminItems = [{ path: "/admin", label: "Admin", show: isAdmin }];
  const navItems = [
    ...commonItems.filter((item) => item.show),
    ...adminItems.filter((item) => item.show),
  ];

  useEffect(() => {
    const pathname = location.pathname;
    const currentPage = pathname === "/" ? "Home" : pathname.substring(1);
    const titleMap = {
      Home: "Pedal Crafters",
      products: "Products - Pedal Crafters",
      "products/add": "Add Products - Pedal Crafters",
      "products/update": "Update Product - Pedal Crafters",
      cart: "Cart - Pedal Crafters",
      checkout: "Checkout - Pedal Crafters",
      orderSuccess: "Order Success - Pedal Crafters",
      admin: "Admin - Pedal Crafters",
      "admin/products": "Edit Products - Pedal Crafters",
      "admin/users": "Users - Pedal Crafters",
      profile: "Profile - Pedal Crafters",
      "profile/update": "Update Profile - Pedal Crafters",
      signin: "Sign in - Pedal Crafters",
      register: "Register - Pedal Crafters",
    };

    const isProductRoute = pathname.match(/^\/products\/\d+(\/update)?$/);
    if (isProductRoute) {
      document.title =
        titleMap[isProductRoute[1] ? "products/update" : "products"] ||
        "404 Not Found - Pedal Crafters";
    } else {
      document.title =
        titleMap[currentPage] || "404 Not Found - Pedal Crafters";
    }

    setSelectedPage(currentPage);
  }, [location.pathname, selectedPage]);

  useEffect(() => {
    setIsMenuToggled(false);
    setSelectedPage((prev) => prev);
    if (cart.totalQuantity > 0) {
      fetchCart();
    }
  }, [cart.totalQuantity, selectedPage]);

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
    <nav data-nosnippet className='bg-[#085162] z-40 w-full sticky top-0 py-5'>
      <div className='flex items-center justify-between mx-auto w-5/6'>
        <h4 className={`text-xl font-bold ${isMenuToggled ? "z-50" : ""}`}>
          <Link
            to='/'
            aria-label='Pedal Crafters Logo'
            className='hover:text-orange-500 transition duration-500 text-white'
            onClick={() => {
              scrollToTop();
              setIsMenuToggled(false);
            }}
          >
            Pedal Crafters
          </Link>
        </h4>
        {isDesktop ? (
          <div className='flex justify-between gap-4 text-sm font-extrabold'>
            {navItems.map((item, index) => (
              <CustomLink
                key={index}
                page={item.path === "/" ? "" : item.path.substring(1)}
                selectedPage={selectedPage}
                setSelectedPage={setSelectedPage}
                label={item.label}
                onClick={() => setIsMenuToggled(false)}
                fetchCart={fetchCart}
              />
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
            } fixed top-0 right-0 min-h-[100vh] bg-[#085162] w-screen`}
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
            <div className='flex flex-col text-center gap-5 my-10 text-2xl font-semibold'>
              {navItems.map((item, index) => (
                <CustomLink
                  key={index}
                  page={item.path === "/" ? "" : item.path.substring(1)}
                  selectedPage={selectedPage}
                  setSelectedPage={setSelectedPage}
                  label={item.label}
                  onClick={() => setIsMenuToggled(false)}
                  fetchCart={fetchCart}
                />
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
    isAdmin: !!state.auth.isAdmin,
    cart: state.cart,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    handleCartLinkClick() {
      dispatch(logout());
    },
    fetchCart: () => dispatch(fetchCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
