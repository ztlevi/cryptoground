import React, { Component } from 'react';
import { Row, Col } from 'antd';

import IntraDay from '../../containers/IntraDay';
import HistoricalData from '../../containers/HistoricalData';
import CurrentCurrency from '../../containers/CurrentCurrency';
import Transaction from '../../containers/Transaction';
import LeaderBoard from '../../containers/LeaderBoard';

class Databoard extends Component {
  render() {
    return (
      <div className="gutter-example">
        <Row gutter={16}>
          <Col className="gutter-row" span={18}>
            <IntraDay />
            <HistoricalData />
          </Col>
          <Col className="gutter-row" span={6}>
            <CurrentCurrency />
          </Col>
          <Col span={24}>
            <Transaction />
          </Col>
          <Col span={24}>
            <LeaderBoard />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Databoard;
