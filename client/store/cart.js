import axios from "axios";
import { TOKEN } from "./auth";

const GUEST_CART = "cart";

// ACTION TYPES
const SET_CART = "SET_CART";
const UPDATE_CART = "UPDATE_CART";

// ACTION CREATORS
export const _setCart = (cart) => ({
  type: SET_CART,
  cart,
});

export const _updateCart = (cart) => ({
  type: UPDATE_CART,
  cart,
});


const calculateTotalQuantity = (products) => {
  return products.reduce(
    (total, product) => total + product.cartItem.quantity,
    0
  );
};

// THUNKS
export const fetchCart = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (token) {
        const { data } = await axios.get("/api/cart", {
          headers: {
            authorization: token,
          },
        });
        await dispatch(
          _setCart({
            ...data,
            totalQuantity: calculateTotalQuantity(data.products),
          })
        );
      } else {
        // GUEST
        const cart = JSON.parse(window.localStorage.getItem(GUEST_CART));
        let newCart;
        if (!cart) {
          newCart = { totalQuantity: 0, products: [] };
          window.localStorage.setItem(GUEST_CART, JSON.stringify(newCart));
        } else {
          newCart = {
            ...cart,
            totalQuantity: calculateTotalQuantity(cart.products),
          };
        }
        await dispatch(_setCart(newCart));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToCart = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.post(
          "/api/cart",
          {
            productId: product.id,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(
          _updateCart({
            ...data,
            totalQuantity: calculateTotalQuantity(data.products),
          })
        );
      } else {
        // GUEST
        const cart = JSON.parse(window.localStorage.getItem(GUEST_CART));
        let newCart = { ...cart };

        const isCartNotEmpty =
          cart && cart.products && cart.products.length > 0;

        const productIndexInCart = isCartNotEmpty
          ? cart.products.findIndex(({ id }) => id == product.id)
          : -1;


        if (
          productIndexInCart >= 0 &&
          newCart.products[productIndexInCart].cartItem &&
          newCart.products[productIndexInCart].cartItem.quantity
        ) {

          newCart.products[productIndexInCart].cartItem.quantity =
            newCart.products[productIndexInCart].cartItem.quantity + 1;
        } else {
          const newProductInCart = {
            ...product,
            cartItem: { quantity: 1, productId: product.id },
          };
          if (!isCartNotEmpty) {
            newCart.products = [newProductInCart];
          } else {
            newCart.products = [...newCart.products, newProductInCart];
          }
        }


        window.localStorage.setItem(GUEST_CART, JSON.stringify(newCart));

        dispatch(
          _updateCart({
            ...newCart,
            totalQuantity: calculateTotalQuantity(newCart.products),
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteFromCart = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.delete(`/api/cart/${productId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(
          _updateCart({
            ...data,
            totalQuantity: calculateTotalQuantity(data.products),
          })
        );
      } else {
        // GUEST
        const cart = JSON.parse(window.localStorage.getItem(GUEST_CART));

        const remainingProducts = cart.products.filter(
          (product) => product.cartItem.productId !== productId
        );

        const newCart = { ...cart, products: remainingProducts };
        window.localStorage.setItem(GUEST_CART, JSON.stringify(newCart));
        dispatch(
          _updateCart({
            ...newCart,
            totalQuantity: calculateTotalQuantity(newCart.products),
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateQuantity = (product, newQuantity) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.put(
          "/api/cart",
          {
            productId: product.id,
            newQuantity,
          },
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(
          _updateCart({
            ...data,
            totalQuantity: calculateTotalQuantity(data.products),
          })
        );
      } else {
        // GUEST
        const cart = JSON.parse(window.localStorage.getItem(GUEST_CART));
        const productIdx = cart.products.findIndex(
          (item) => item.id === product.id
        );
        cart.products[productIdx].cartItem.quantity =
          cart.products[productIdx].cartItem.quantity + newQuantity;
        if (cart.products[productIdx].cartItem.quantity <= 0) {
          cart.products.splice(productIdx, 1);
        }
        window.localStorage.setItem(GUEST_CART, JSON.stringify(cart));
        dispatch(
          _updateCart({
            ...cart,
            totalQuantity: calculateTotalQuantity(cart.products),
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};


export const emptyCart = (cart) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        if (cart.id) {
          const { data } = await axios.put(`/api/cart/orderSuccess`, cart, {
            headers: {
              authorization: token,
            },
          });
          dispatch(_updateCart(data));
        } else {
          // GUEST
          window.localStorage.setItem(
            GUEST_CART,
            JSON.stringify({ products: [] })
          );
          const { data } = await axios.put(`/api/cart/orderSuccess`, cart, {
            headers: {
              authorization: token,
            },
          });
          dispatch(_updateCart(data));
        }

        dispatch(_setCart([]));
      } else {
        // GUEST
        window.localStorage.setItem(
          GUEST_CART,
          JSON.stringify({ products: [] })
        );
        const { data } = await axios.put(`/api/cart/orderSuccess`, cart, {
          headers: {
            authorization: 'guest',
          },
        });
        dispatch(_updateCart(data));

        dispatch(_setCart([]));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
const initialState = { totalQuantity: 0, products: [] };

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CART:
      return action.cart;
    case UPDATE_CART:
      return {
        ...action.cart,
        totalQuantity: calculateTotalQuantity(action.cart.products),
      };
    default:
      return state;
  }
}
