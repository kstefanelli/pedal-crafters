import axios from 'axios'

// ACTION TYPES
const SET_PRODUCT = 'SET_PRODUCT'
const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

// ACTION CREATORS
export const _setProduct = (product) => ({
  type: SET_PRODUCT,
  product
});

const _updateProduct = product => {
  return {
    type: UPDATE_PRODUCT,
    product
  }
}

// THUNKS
export const fetchProduct = (id) => async (dispatch) => {
  const {data} = await axios.get(`/api/products/${id}`)
  dispatch(_setProduct(data));
}

export const updateProduct = (product, history) => {
  return async (dispatch) => {
    try {
      const { data: updated } = await axios.put(`/api/products/${product.id}`, product);
      dispatch(_updateProduct(updated, product));
      history.push(`/products/${product.id}`)
    } catch (err) {
      console.log(err)
    }
  }
}

// REDUCER
const initialState = {}

export default function singleProductReducer (state = initialState, action) {
  switch(action.type){
    case SET_PRODUCT:
      return action.product
    case UPDATE_PRODUCT:
      return { ...action.product, product: action.product };
    default:
      return state
  }
}
