import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import productsReducer from "./allProducts";
import ordersReducer from "./allOrders";
import cartReducer from "./cart";
import usersReducer from "./allUsers";
import singleProductReducer from "./singleProduct";
import singleUserReducer from "./singleUser";
import wishlistReducer from "./wishlist";

const reducer = combineReducers({
  auth,
  products: productsReducer,
  orders: ordersReducer,
  cart: cartReducer,
  singleUser: singleUserReducer,
  users: usersReducer,
  singleProduct: singleProductReducer,
  wishlist: wishlistReducer,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
