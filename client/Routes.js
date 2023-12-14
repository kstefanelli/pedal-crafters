import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch } from 'react-router-dom';
import { SignIn } from './components/AuthForm';
import Home from './components/Home';
import { me } from './store';
import Products from './components/Products';
import Cart from './components/Cart';
import Admin from './components/Admin';
import SingleProduct from './components/SingleProduct';
import UserProfile from './components/UserProfile';
import CreateUser from './components/CreateUser';
import UpdateUser from './components/UpdateUser';
import NotFoundPage from './components/NotFoundPage';
import AdminUsers from './components/AdminUsers';
import AdminShop from './components/AdminShop';
import About from './components/About';
import OrderHistory from './components/OrderHistory';


class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <div>
        {isLoggedIn ? (
          <div>
            {isAdmin ? (
              <Switch>
                {/* Routes if logged in and admin */}
                <Route exact path="/" component={Home} />
                <Route exact path="/admin" component={Admin} />
                <Route exact path="/admin/users" component={AdminUsers} />
                <Route exact path="/admin/products" component={AdminShop} />
                <Route exact path="/profile/update" component={UpdateUser} />
                <Route path="/products/:id" component={SingleProduct} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/profile" component={UserProfile} />
                <Route path="/users/orders" component={OrderHistory} />
                <Route path="/about" component={About} />
                <Route path="*" component={NotFoundPage} status={404} />
              </Switch>
            ) : (
              <Switch>
                {/* Routes if logged in but not admin */}
                <Route exact path="/" component={Home} />
                <Route exact path="/products" component={Products} />
                <Route exact path="/products/:id" component={SingleProduct} />
                <Route exact path="/cart" component={Cart} />
                <Route exact path="/profile" component={UserProfile} />
                <Route exact path="/profile/update" component={UpdateUser} />
                <Route path="/users/orders" component={OrderHistory} />
                <Route path="/about" component={About} />
                <Route path="*" component={NotFoundPage} status={404} />
              </Switch>
            )}
          </div>
        ) : (
          <Switch>
            {/* Routes if not logged in */}
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/register" component={CreateUser} />
            <Route exact path="/products" component={Products} />
            <Route exact path="/products/:id" component={SingleProduct} />
            <Route exact path="/cart" component={Cart} />
            <Route path="/about" component={About} />
            <Route path="*" component={NotFoundPage} status={404} />
          </Switch>
        )}
      </div>
    );
  }
}

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
