import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Logout from '../Auth/Logout/Logout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import * as actions from '../../store/actions/index';
import asyncComponent from '../../hoc/asyncComponent/asyncComponent';

const asyncCheckout = asyncComponent(() => {
  return import ('../Checkout/Checkout');
})

const asyncOrders = asyncComponent(() => {
  return import ('../Orders/Orders');
})

const asyncAuth = asyncComponent(() => {
  return import ('../Auth/Auth');
})

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path='/auth' component={asyncAuth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/'/>
      </Switch>
    );

    if(this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={asyncCheckout} />
          <Route path='/orders' component={asyncOrders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={asyncAuth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/'/>
        </Switch>
      )
    }

    return (
      <Layout>
        {routes}
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));