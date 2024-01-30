import axios from "axios";
import { TOKEN } from "./auth";

// ACTION TYPES
const SET_WISHLIST = "SET_WISHLIST";
const UPDATE_WISHLIST = "UPDATE_WISHLIST";

// ACTION CREATORS
export const _setWishlist = (wishlist) => ({
  type: SET_WISHLIST,
  wishlist,
});

export const _updateWishlist = (wishlist) => ({
  type: UPDATE_WISHLIST,
  wishlist,
});

// THUNKS
export const fetchWishlist = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (token) {
        const { data } = await axios.get("/api/users/wishlist", {
          headers: {
            authorization: token,
          },
        });
        dispatch(_setWishlist(data));
      } else {
        dispatch(_setWishlist([]));
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToWishlist = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.post(
          `/api/users/wishlist/${productId}`,
          null,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(_updateWishlist(data));
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeFromWishlist = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.delete(
          `/api/users/wishlist/${productId}`,
          {
            headers: {
              authorization: token,
            },
          }
        );
        dispatch(_updateWishlist(data));
      } else {
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
const initialState = [];

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WISHLIST:
    case UPDATE_WISHLIST:
      return action.wishlist;
    default:
      return state;
  }
}
