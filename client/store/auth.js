import axios from 'axios';
import history from '../history';

export const TOKEN = 'token';

//ACTION TYPES
const SET_AUTH = 'SET_AUTH';

// ACTION CREATORS
const setAuth = (auth) => ({ type: SET_AUTH, auth });

// THUNKS
export const me = () => async (dispatch) => {
  const token = window.localStorage.getItem(TOKEN);
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token,
      },
    });
    return dispatch(setAuth(res.data));
  }
};

export const authenticate = (email, password, method) => async (dispatch) => {
  try {
    const res = await axios.post(`/auth/${method}`, { email, password });
    window.localStorage.setItem(TOKEN, res.data.token);
    dispatch(me());
    history.push('/');
  } catch (authError) {
    if (
      authError.response &&
      authError.response.data &&
      authError.response.data.message
    ) {
      return dispatch(setAuth({ error: authError.response.data.message }));
    } else {
      return dispatch(setAuth({ error: 'An error has occurred' }));
    }
  }
};

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
  history.push('/');
  return {
    type: SET_AUTH,
    auth: {},
  };
};

// REDUCER
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth;
    default:
      return state;
  }
}
