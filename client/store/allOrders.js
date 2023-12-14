import axios from 'axios';

// ACTION TYPES
const SET_ORDERS = 'SET_ORDERS';

// ACTION CREATORS
export const _setOrders = (orders) => ({
  type: SET_ORDERS,
  orders,
});

// THUNKS
export const fetchOrders = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const { data } = await axios.get(`/api/users/orders`, {
          headers: {
            authorization: token,
          },
        });
        await dispatch(_setOrders(data));
      } else {
        console.log('Bad token');
      }
    } catch (err) {
      console.error(`Can't find order history!`);
    }
  };
};

// REDUCER
const initialState = [];

export default function ordersReducer(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS:
      return action.orders;
    default:
      return state;
  }
}
