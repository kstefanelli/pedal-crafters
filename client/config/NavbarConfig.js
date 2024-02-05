export const getNavbarConfig = (isLoggedIn, cart) => {
  return {
    commonItems: [
      { path: "/products", label: "PRODUCTS", show: true },
      { path: "/", label: "ACCOUNT", show: isLoggedIn },
      { path: "/signin", label: "SIGN IN", show: !isLoggedIn },
      {
        path: "/cart",
        label: `CART${cart.totalQuantity ? ` (${cart.totalQuantity})` : ""}`,
        show: true,
      },
    ],
  };
};
