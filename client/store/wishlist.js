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

const calculateTotalWishlistItems = (wishlist) => {
  if (!Array.isArray(wishlist)) {
    return 0;
  }

  return wishlist.reduce(
    (total, product) => total + (product.wishlistItem?.quantity || 0),
    0
  );
};

// THUNKS
export const fetchWishlist = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);

      if (token) {
        const { data } = await axios.get("/api/wishlist", {
          headers: {
            authorization: token,
          },
        });
        await dispatch(
          _setWishlist({
            ...data,
            totalWishlistItems: calculateTotalWishlistItems(data),
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const addToWishlist = (product) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.post(
          "/api/wishlist/",
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
          _updateWishlist({
            ...data,
            totalWishlistItems: calculateTotalWishlistItems(data.products),
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

export const deleteFromWishlist = (productId) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem(TOKEN);
      if (token) {
        const { data } = await axios.delete(`/api/wishlist/${productId}`, {
          headers: {
            authorization: token,
          },
        });
        dispatch(
          _updateWishlist({
            ...data,
            totalWishlistItems: calculateTotalWishlistItems(data.products),
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
const initialState = { totalWishlistItems: 0, products: [] };

export default function wishlistReducer(state = initialState, action) {
  switch (action.type) {
    case SET_WISHLIST:
      return action.wishlist;
    case UPDATE_WISHLIST:
      return {
        ...action.wishlist,
        totalWishlistItems: calculateTotalWishlistItems(
          action.wishlist.products
        ),
      };
    default:
      return state;
  }
}
