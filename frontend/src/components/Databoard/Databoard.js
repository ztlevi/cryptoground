import React, { Component } from 'react';
import { Row, Col } from 'antd';

import IntraDay from '../../containers/IntraDay';
import HistoricalData from '../../containers/HistoricalData';
import CurrentCurrency from '../../containers/CurrentCurrency';
import Transaction from '../../containers/Transaction';

class Databoard extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={18}>
            <IntraDay />
            <HistoricalData />
          </Col>
          <Col span={6}>
            <CurrentCurrency />
          </Col>
          <Col span={24}>
            <Transaction />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Databoard;
