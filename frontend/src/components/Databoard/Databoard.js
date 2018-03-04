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
        <Route path="/charts" exact render={() => <CurrentCurrency />} />
        <Route
          path="/charts/intraday"
          render={() => (
            <div>
              <CurrentCurrency />
              <IntraDay />
            </div>
          )}
        />
        <Route
          path="/charts/histoday"
          render={() => (
            <div>
              <CurrentCurrency />
              <HistoricalData />
            </div>
          )}
        />
        <Route
          path="/trading"
          render={() => (
            <div>
              <CurrentCurrency />
              <Transaction />
            </div>
          )}
        />
        <Route path="/ranking" component={LeaderBoard} />
      </Switch>
    );
  }
}

export default Databoard;
