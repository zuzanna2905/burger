import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../../hoc/Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Checkout from '../Checkout/Checkout';
import Orders from '../Orders/Orders';
import Logout from '../Auth/Logout/Logout';
import Auth from '../Auth/Auth';
import {Route, Switch, withRouter} from 'react-router-dom';
import * as actions from '../../store/actions/index';

class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/auth' component={Auth} />
          <Route path='/logout' component={Logout} />
          <Route path='/' component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(App));