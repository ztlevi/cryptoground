import React, { Component } from 'react';
import { InputNumber, Button, Dropdown, Menu, Modal } from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as userActions from '../actions/user';
import * as cryptoConfigs from '../res/cryptoConfigs';

const cryptoType = cryptoConfigs.cryptoType;
const currencyType = cryptoConfigs.currencyType;

class TradingHistory extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.onLoadTradingList();
  }

  componentWillReceiveProps(nextProps) {
    console.log('tradinglist', nextProps.tradingList);
  }

  render() {
    return <div>Trading history</div>;
  }
}

TradingHistory.propTypes = {
  tradingList: PropTypes.array,
  onLoadTradingList: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    tradingList: state.trading.tradingList,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadTradingList: () => dispatch(userActions.sagaSyncTradingList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TradingHistory);
