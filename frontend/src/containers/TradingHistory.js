import React, { Component } from 'react';
import { InputNumber, Button, Dropdown, Menu, Modal } from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as userActions from '../actions/user';
import * as cryptoConfigs from '../res/cryptoConfigs';

const cryptoType = cryptoConfigs.cryptoType;
const currencyType = cryptoConfigs.currencyType;

class TradingHistory extends Component {
  generateData(props) {
    var traList = [];
    var i = 0;
    var data = props;
    console.log('initial', data);
    for (var key in data) {
      traList.push({
        key: i,
        timestamp: data[key]['timestamp'],
        tradingType: data[key]['tradingType'],
        tradingFromSym: data[key]['tradingFromSym'],
        tradingToSym: data[key]['tradingToSym'],
        amount: data[key]['tradingAmount'],
        status: data[key]['status'],
        expiration: data[key]['expiration'],
        tradingPrice: data[key]['tradingPrice'],
      });
      i += 1;
    }
    console.log('List', traList);
    //sort traList by timestamp
    traList.sort(function(a, b) {
      var timeA = new Date(a.timestamp),
        timeB = new Date(b.timestamp);
      return timeA < timeB ? 1 : -1;
    });

    //console.log(traList);
    return traList;
  }

  constructor(props) {
    super(props);

    this.state = {
      dataProvider: [],
    };
  }

  componentDidMount() {
    this.props.onLoadTradingList();
  }

  componentWillReceiveProps(nextProps) {
    console.log('tradinglist', nextProps.tradingList);
    this.setState({
      dataProvider: this.generateData(nextProps.tradingList),
    });
  }

  delete(item) {
    var dataList = [...this.state.dataProvider];
    var index = dataList.indexOf(item);
    dataList.splice(index, 1);
    this.setState({
      dataProvider: dataList,
    });
    console.log('delete dataList', index, dataList);
  }

  render() {
    console.log(this.state.dataProvider);
    return (
      <div style={{ marginLeft: 10, marginTop: 15 }}>
        <h4 style={{ textAlign: 'center' }}>Trading List</h4>
        <table className="table" style={{ fontSize: 15, textAlign: 'center' }}>
          <thead>
            <tr>
              <th> Key </th>
              <th> Time </th>
              <th> Type </th>
              <th> Amount </th>
              <th> From Symbol </th>
              <th> To Symbol </th>
              <th> Price </th>
              <th> Status </th>
              <th> Expiration </th>
              <th> Operation </th>
            </tr>
          </thead>
          <tbody>
            {this.state.dataProvider.map((item, i) => (
              <tr key={item.key}>
                <td> {item.key} </td>
                <td> {new Date(item.timestamp * 1000).toString()} </td>
                <td> {item.tradingType} </td>
                <td> {item.amount} </td>
                <td> {item.tradingPrice} </td>
                <td> {item.tradingFromSym} </td>
                <td> {item.tradingToSym} </td>
                <td> {item.status} </td>
                <td>
                  {new Date(
                    (item.expiration + item.timestamp) * 1000
                  ).toString()}
                </td>
                <td>
                  <Button
                    type="danger"
                    disabled={item.status != 'suspend'}
                    onClick={this.delete.bind(this)}
                    item={item}
                  >
                    Cancle
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

TradingHistory.propTypes = {
  tradingList: PropTypes.object,
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
