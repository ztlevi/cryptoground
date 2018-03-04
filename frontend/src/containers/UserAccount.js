import React, { Component } from 'react';
//import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import * as dataActions from '../actions/data';

class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return <div />;
  }
}

UserAccount.propTypes = {
  userName: PropTypes.string,
  balance: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    userName: state.user.balance,
    balance: state.user.email,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartFetchRealTimeData: () =>
      dispatch(dataActions.sagaSyncRealTimePricing()),
    onStopFetchRealTimeData: () =>
      dispatch(dataActions.sagaStopSyncRealTimePricing()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);
