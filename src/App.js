import React, { Component } from 'react';
import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import { Route, Switch } from "react-router-dom";
import Logout from './containers/Auth/Logout/Logout';
import * as actions from "./store/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import asyncComponent from "../src/hoc/asyncComponent/asyncComponent";

const asyncOrders = asyncComponent(() => {
  return import('./containers/Orders/Orders')
}) 

const asyncCheckout = asyncComponent(() => {
  return import('./containers/Checkout/Checkout');
});

const asyncAuth = asyncComponent(() => {
  return import('./containers/Auth/Auth');
});

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignUp()
  }
  render() { 
    let routes = (
      <Switch>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to='/'/>
        </Switch>
    )

    if(this.props.isAuth){
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout}/>
          <Route path="/Orders" component={asyncOrders}/>
          <Route path="/auth" component={asyncAuth}/>
          <Route path="/logout" component={Logout}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Redirect to='/'/>

        </Switch>
      )
    }

    return ( 
      <div >
      <Layout>
          {routes}
      </Layout>
    </div>
     );
  }
}

const mapStateToProps = state => {
  return{
    isAuth: state.auth.token !==null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onTryAutoSignUp: () => dispatch(actions.checkAuthStatus())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
