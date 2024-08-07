import React, { useEffect } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import { SignIn } from "./components/AuthForm";
import Home from "./components/Home";
import { me } from "./store";
import Products from "./components/Products/Products";
import Cart from "./components/Order/Cart";
import Admin from "./components/Admin/Admin";
import SingleProduct from "./components/Products/SingleProduct";
import OrderHistory from "./components/Order/OrderHistory";
import UserProfile from "./components/User/UserProfile";
import CreateProduct from "./components/Products/CreateProduct";
import CreateUser from "./components/User/CreateUser";
import UpdateProduct from "./components/Products/UpdateProduct";
import UpdateUser from "./components/User/UpdateUser";
import NotFoundPage from "./components/NotFoundPage";
import OrderSuccess from "./components/Order/OrderSuccess";
import Checkout from "./components/Order/Checkout";
import AdminUsers from "./components/Admin/AdminUsers";
import AdminShop from "./components/Admin/AdminShop";

const Routes = ({ isLoggedIn, isAdmin, loadInitialData }) => {
  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  const commonRoutes = (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/products' component={Products} />
      <Route exact path='/products/:id' component={SingleProduct} />
      <Route exact path='/cart' component={Cart} />
      <Route path='/checkout' component={Checkout} />
      <Route path='/orderSuccess' component={OrderSuccess} />
      <Route path='/profile' component={UserProfile} />
      <Route path='/profile/update' component={UpdateUser} />
      <Route path='/users/orders' component={OrderHistory} />
      <Route path='*' component={NotFoundPage} status={404} />
    </Switch>
  );

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          {isAdmin && (
            <Route exact path='/admin/users' component={AdminUsers} />
          )}
          {isAdmin && (
            <Route exact path='/admin/products' component={AdminShop} />
          )}
          {isAdmin && <Route path='/products/add' component={CreateProduct} />}
          {isAdmin && (
            <Route
              exact
              path='/products/:id/update'
              component={UpdateProduct}
            />
          )}
          <Route exact path='/profile/update' component={UpdateUser} />
          {commonRoutes}
        </Switch>
      ) : (
        <Switch>
          <Route path='/signin' component={SignIn} />
          <Route path='/register' component={CreateUser} />
          {commonRoutes}
        </Switch>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.auth.id,
    isAdmin: !!state.auth.isAdmin,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(Routes));
