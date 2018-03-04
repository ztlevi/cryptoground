import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { Switch, Route, NavLink, Redirect } from 'react-router-dom';

import IntraDay from '../../containers/IntraDay';
import HistoricalData from '../../containers/HistoricalData';
import CurrentCurrency from '../../containers/CurrentCurrency';
import Transaction from '../../containers/Transaction';
import LeaderBoard from '../../containers/LeaderBoard';
import TradingHistory from '../../containers/TradingHistory';

class Databoard extends Component {
  render() {
    return (
      <Switch>
        <Route path="/charts" exact render={() => <CurrentCurrency />} />
        <Route
          path="/charts/intraday"
          render={() => (
            <div style={{ margin: '20px 10px 20px 10px' }}>
              <CurrentCurrency />
              <IntraDay />
            </div>
          )}
        />
        <Route
          path="/charts/histoday"
          render={() => (
            <div style={{ margin: '20px 10px 20px 10px' }}>
              <CurrentCurrency />
              <HistoricalData />
            </div>
          )}
        />
        <Route
          path="/trading"
          render={() => (
            <div style={{ margin: '20px 10px 20px 10px' }}>
              <CurrentCurrency />
              <Transaction />
            </div>
          )}
        />
        <Route path="/ranking" component={LeaderBoard} />
        <Route path="/user/account" component={null} />
        <Route path="/user/history" component={TradingHistory} />
        <Redirect from="/" to="/charts" />
      </Switch>
    );
  }
}

export default Databoard;
