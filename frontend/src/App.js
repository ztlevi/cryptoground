import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from './hoc/Layout/Layout';
//import Home from './containers/Home';
//import Signin from './containers/Signin/Signin';
//import Signup from './containers/Signup/Signup';


class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        </Layout>
      </div>
    );
  }
}

export default App;
