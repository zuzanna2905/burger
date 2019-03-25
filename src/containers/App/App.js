import React, { Component } from 'react';
import Layout from '../../hoc/Layout/Layout';
import BurgerBuilder from '../BurgerBuilder/BurgerBuilder';
import Checkout from '../Checkout/Checkout';
import Orders from '../Orders/Orders';
import {Route, Switch} from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path='/checkout' component={Checkout} />
          <Route path='/orders' component={Orders} />
          <Route path='/' component={BurgerBuilder} />
        </Switch>
      </Layout>
    );
  }
}

export default App;