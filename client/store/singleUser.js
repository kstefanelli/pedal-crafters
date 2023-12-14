import axios from 'axios';
import { me } from './auth'

// ACTION TYPES
const SET_USER = 'SET_USER';
const UPDATE_USER = 'UPDATE_USER';

// ACTION CREATORS
export const _setUser = (user) => ({
  type: SET_USER,
  user,
});

export const _updateUser = (user) => ({
  type: UPDATE_USER,
  user,
});

// THUNKS
export const fetchUser = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const { data } = await axios.get('/api/users/profile', {
          headers: {
            authorization: token,
          },
        });
        await dispatch(_setUser(data));
      } else {
        console.log('Bad token');
      }
    } catch (err) {
      console.error(`Can't find user!`);
    }
  };
};

export const updateUser = (user, history) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');

      if (token) {
        const { data } = await axios.put(`/api/users/account`, user, {
          headers: {
            authorization: token
          }
        })
        dispatch(_updateUser(data))
        dispatch(me())
        history.push('/profile')
      }
    } catch (err) {
      console.error(`Can't find user!`);
    }
  }
}

// REDUCER
const initialState = [];

export default function singleUserReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return action.user;
    case UPDATE_USER:
      return action.user
    default:
      return state;
  }
}
