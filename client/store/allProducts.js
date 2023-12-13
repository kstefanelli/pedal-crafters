import axios from "axios";

// ACTION TYPES
const SET_PRODUCTS = 'SET_PRODUCTS'
const CREATE_PRODUCT = 'CREATE_PRODUCT'
const DELETE_PRODUCT = 'DELETE_PRODUCT'

// ACTION CREATORS
export const _setProducts = (products) => ({
    type: SET_PRODUCTS,
    products
  });

export const _createProduct = (product) => ({
  type: CREATE_PRODUCT,
  product
})

export const _deleteProduct = (product) => {
  return {
    type: DELETE_PRODUCT,
    product,
  };
};

// THUNKS
export const fetchProducts = () => {
  return async (dispatch) => {
    try {
    const {data} = await axios.get('/api/products')
    dispatch(_setProducts(data))
    } catch (error) {
      console.error(error)
    }
  }
};

export const createProduct = (product, history) => {
  return async (dispatch) => {
    const { data: created } = await axios.post('/api/products', product);
    dispatch(_createProduct(created));
    history.push('/admin/products')
  }
}

export const deleteProduct = (id, history) => {
  return async (dispatch) => {
    try {
      const { data: product } = await axios.delete(`/api/products/${id}`);
      dispatch(_deleteProduct(product));
      history.push('/admin/products');
    } catch (err) {
      console.error(err);
    }
  };
};

// REDUCER
const initialState = []

export default function productsReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    case CREATE_PRODUCT:
      return [...state, action.product]
    case DELETE_PRODUCT:
      return state.filter((product) => product.id !== action.product.id);
    default:
      return state

  }
}