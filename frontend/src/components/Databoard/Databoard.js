import React, { Component } from 'react';
import { Row, Col } from 'antd';

import IntraDay from '../../containers/IntraDay';
import HistoricalData from '../../containers/HistoricalData';
import CurrentCurrency from '../../containers/CurrentCurrency';

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
        </Row>
      </div>
    );
  }
}

export default Databoard;
