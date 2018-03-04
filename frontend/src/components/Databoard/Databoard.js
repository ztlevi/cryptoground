import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import IntraDay from '../../containers/IntraDay';
import HistoricalData from '../../containers/HistoricalData';
import CurrentCurrency from '../../containers/CurrentCurrency';
import Transaction from '../../containers/Transaction';
import LeaderBoard from '../../containers/LeaderBoard';

class Databoard extends Component {
  render() {
    return (
      <Switch>
        <Route path="/charts" exact component={CurrentCurrency} />
        <Route path="/charts/intraday" component={IntraDay} />
        <Route path="/charts/histoday" component={HistoricalData} />
        <Route path="/charts/trading" component={Transaction} />
      </Switch>
    );
  }
}

export default Databoard;
