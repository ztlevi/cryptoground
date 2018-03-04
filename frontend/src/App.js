import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from 'react-router-dom';

import MyLayout from './hoc/Layout/Layout';
//import Home from './containers/Home';
//import Signin from './containers/Signin/Signin';
//import Signup from './containers/Signup/Signup';

class App extends Component {
  render() {
    return <MyLayout />;
  }
}

export default App;
