import axios from "axios";
import { me } from './auth'

// ACTION TYPES
const CREATE_USER = 'CREATE_USER';
const SET_USERS = 'SET_USERS';

// ACTION CREATORS
export const _createUser = (user) => {
  return {
    type: CREATE_USER,
    user,
  };
};

export const _setUsers = (users) => {
  return {
    type: SET_USERS,
    users,
  };
};


// THUNKS
export const createUser = (user, history) => {
  return async (dispatch) => {
    const { data: token } = await axios.post('/api/users', user);
    window.localStorage.setItem('token', token);
    dispatch(_createUser(user));
    dispatch(me())
    history.push('/');
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      if (token) {
        const { data } = await axios.get('/api/users', {
          headers: {
            authorization: token,
          },
        });
        await dispatch(_setUsers(data));
      } else {
        console.log('Bad token 2')
      }
    } catch (err) {
      console.log(err);
    }
  };
};

// REDUCER
const initialState = [];

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_USER:
      return action.user;
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}