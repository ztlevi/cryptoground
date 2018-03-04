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
      alteredData: {},
    };
  }

  handleOk() {
    this.props.toggleTradingResponseModal(null, false);
  }

  componentDidMount() {
    this.props.onLoadTradingList();
  }

  componentWillReceiveProps(nextProps) {
    console.log('tradinglist keys', nextProps.tradingList);
    let alteredData = {};
    for (let k in nextProps.tradingList) {
      let obj = nextProps.tradingList[k];
      const { idToken, timestamp } = obj;
      alteredData[timestamp] = {
        idToken: idToken,
        key: k,
      };
    }
    this.setState({
      dataProvider: this.generateData(nextProps.tradingList),
      alteredData: alteredData,
    });
  }

  delete(timestamp) {
    // var dataList = [...this.state.dataProvider];
    // //var index = dataList.indexOf(item);
    // //dataList.splice(index, 1);
    // dataList = dataList.filter(i => i !== item);
    // this.setState({
    //   dataProvider: dataList,
    // });
    // console.log('delete dataList', dataList);
    console.log(this.state.alteredData[timestamp]);
    this.props.onCancelTradingRequest(this.state.alteredData[timestamp]);
  }

  render() {
    console.log(this.state.dataProvider);
    return (
      <div style={{ marginLeft: 10, marginTop: 15 }}>
        <Modal
          visible={this.props.isModalOpen}
          onOk={e => this.handleOk(e)}
          onCancel={e => this.handleOk(e)}
          footer={null}
          wrapClassName="vertical-center-modal"
        >
          {this.props.text}
        </Modal>
        <h4 style={{ textAlign: 'center' }}>Trading List</h4>
        <table className="table" style={{ fontSize: 15, textAlign: 'center' }}>
          <thead>
            <tr>
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
            {this.state.dataProvider.map(item => (
              <tr key={item.key}>
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
                    onClick={() => this.delete(item.timestamp)}
                  >
                    Cancel
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
  onCancelTradingRequest: PropTypes.func,
  toggleTradingResponseModal: PropTypes.func,
  isModalOpen: PropTypes.bool,
  text: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    tradingList: state.trading.tradingList,
    isModalOpen: state.modal.tradingResponseModal.isOpen,
    text: state.modal.tradingResponseModal.text,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onCancelTradingRequest: payload =>
      dispatch(userActions.sagaCancelTradingRequest(payload)),
    onLoadTradingList: () => dispatch(userActions.sagaSyncTradingList()),
    toggleTradingResponseModal: (text, isOpen) =>
      dispatch(userActions.toggleTradingResponseModal(text, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TradingHistory);
