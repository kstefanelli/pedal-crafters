import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import { me } from "./store";
import NotFoundPage from "./components/NotFoundPage";
import Cart from "./components/Cart";
import Products from "./components/Products";
import SingleProduct from "./components/SingleProduct";
import About from "./components/About";

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
                <Route exact path='/' component={Home} />
                <Route path='/products/:id' component={SingleProduct} />
                <Route exact path='/cart' component={Cart} />
                <Route path='/about' component={About} />
                <Route path='*' component={NotFoundPage} status={404} />
              </Switch>
            ) : (
              <Switch>
                {/* Routes if logged in but not admin */}
                <Route exact path='/' component={Home} />
                <Route exact path='/products' component={Products} />
                <Route path='/products/:id' component={SingleProduct} />
                <Route exact path='/cart' component={Cart} />
                <Route path='/about' component={About} />
                <Route path='*' component={NotFoundPage} status={404} />
              </Switch>
            )}
          </div>
        ) : (
          <Switch>
            {/* Routes if not logged in */}
            <Route exact path='/' component={Home} />
            <Route path='/products/:id' component={SingleProduct} />
            <Route exact path='/cart' component={Cart} />
            <Route path='/about' component={About} />
            <Route path='*' component={NotFoundPage} status={404} />
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
