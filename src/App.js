import React, { useEffect, Suspense, lazy } from 'react';
import { connect } from 'react-redux';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import {Route, Switch, withRouter, Redirect} from 'react-router-dom';
import Spinner from './components/UI/Spinner/Spinner';
import * as actions from './store/actions/index';

const Checkout = lazy(() => {
  return import ('./containers/Checkout/Checkout');
})

const Orders = lazy(() => {
  return import ('./containers/Orders/Orders');
})

const Auth = lazy(() => {
  return import ('./containers/Auth/Auth');
})

const App = props => {
  useEffect(()=>{
    props.onTryAutoSignup();
  }, [])

    let routes = (
      <Switch>
        <Route path='/auth' component={Auth} />
        <Route path='/' exact component={BurgerBuilder} />
        <Redirect to='/'/>
      </Switch>
    );

    if(props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/logout' component={Logout} />
          <Route path='/auth' component={Auth} />
          <Route path='/' exact component={BurgerBuilder} />
          <Redirect to='/'/>
        </Switch>
      )
    }

  return (
    <Layout>
      <Suspense fallback={<Spinner/>}>{routes}</Suspense>
    </Layout>
  );
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