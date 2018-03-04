import React, { Component } from 'react';
import { InputNumber, Button, Dropdown, Menu, Modal } from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as userActions from '../actions/user';
import * as cryptoConfigs from '../res/cryptoConfigs';

const cryptoType = cryptoConfigs.cryptoType;
const currencyType = cryptoConfigs.currencyType;

class Transaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buyPrice: 0.0,
      buyAmount: 0.0,
      sellPrice: 0.0,
      sellAmount: 0.0,
      buyFromSym: 'USD',
      buyToSym: 'BTC',
      sellFromSym: 'BTC',
      sellToSym: 'USD',
    };
  }

  onChangeBuyPrice(value) {
    this.setState({
      buyPrice: value,
    });
  }

  onChangeBuyAmount(value) {
    this.setState({
      buyAmount: value,
    });
  }

  onChangeSellPrice(value) {
    this.setState({
      sellPrice: value,
    });
  }

  onChangeSellAmount(value) {
    this.setState({
      sellAmount: value,
    });
  }

  onBuy() {
    let payload = {};
    payload.idToken = this.props.idToken;
    payload.tradingType = 'BUY';
    payload.tradingPrice = this.state.buyPrice;
    payload.tradingAmount = this.state.buyAmount;
    payload.tradingFromSym = this.state.buyFromSym;
    payload.tradingToSym = this.state.buyToSym;
    //console.log(payload);
    this.props.onBuy(payload);
  }

  onSell() {
    let payload = {};
    payload.idToken = this.props.idToken;
    payload.tradingType = 'SELL';
    payload.tradingPrice = this.state.sellPrice;
    payload.tradingAmount = this.state.sellAmount;
    payload.tradingFromSym = this.state.sellFromSym;
    payload.tradingToSym = this.state.sellToSym;
    //console.log(payload);
    this.props.onSell(payload);
  }

  onBuyFromChange(key) {
    console.log(key);
    this.setState({
      buyFromSym: key,
    });
  }

  onBuyToChange(key) {
    console.log(key);
    this.setState({
      buyToSym: key,
    });
  }

  onSellFromChange(key) {
    console.log(key);
    this.setState({
      sellFromSym: key,
    });
  }

  onSellToChange(key) {
    console.log(key);
    this.setState({
      sellToSym: key,
    });
  }

  handleOk() {
    this.props.toggleTradingResponseModal(null, false);
  }
  render() {
    let buyFromMenu = (
      <Menu onClick={e => this.onBuyFromChange(e.key)}>
        {currencyType.map(val => <Menu.Item key={val}>{val}</Menu.Item>)}
      </Menu>
    );
    let buyToMenu = (
      <Menu onClick={e => this.onBuyToChange(e.key)}>
        {cryptoType.map(val => <Menu.Item key={val}>{val}</Menu.Item>)}
      </Menu>
    );
    let sellFromMenu = (
      <Menu onClick={e => this.onSellFromChange(e.key)}>
        {cryptoType.map(val => <Menu.Item key={val}>{val}</Menu.Item>)}
      </Menu>
    );
    let sellToMenu = (
      <Menu onClick={e => this.onSellToChange(e.key)}>
        {currencyType.map(val => <Menu.Item key={val}>{val}</Menu.Item>)}
      </Menu>
    );
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          margin: '10 10 10 10',
          height: '100%',
        }}
      >
        <Modal
          visible={this.props.isModalOpen}
          onOk={e => this.handleOk(e)}
          onCancel={e => this.handleOk(e)}
          footer={null}
          wrapClassName="vertical-center-modal"
        >
          {this.props.text}
        </Modal>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            margin: '8px',
          }}
        >
          <p
            style={{
              width: '35%',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              backgroundColor: 'rgb(50, 180, 245)',
              color: 'white',
              fontStyle: 'bold',
              fontSize: '20px',
              textAlign: 'center',
              margin: 0,
            }}
          >
            <b>Buying</b>
          </p>
          <div
            style={{
              border: 'solid',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
              borderBottomLeftRadius: '10px',
              borderColor: 'rgb(50, 180, 245)',
              borderWidth: 2,
              margin: 0,
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '8px',
              }}
            >
              <span style={{ width: '40%' }}>Price</span>
              <InputNumber
                style={{ width: '50%' }}
                key="0"
                min={0.0001}
                defaultValue={10000}
                value={this.state.buyPrice}
                onChange={value => this.onChangeBuyPrice(value)}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <span style={{ width: '40%', fontSize: '20px' }}>Amount</span>
              <InputNumber
                style={{ width: '50%' }}
                key="1"
                min={0.0001}
                defaultValue={1}
                value={this.state.buyAmount}
                onChange={value => this.onChangeBuyAmount(value)}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '8px' }}
            >
              <span style={{ width: '40%' }}>Using balance</span>
              <Dropdown.Button overlay={buyFromMenu} style={{ width: '50%' }}>
                {this.state.buyFromSym}
              </Dropdown.Button>
            </div>

            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '8px' }}
            >
              <span style={{ width: '40%' }}>Cryptocurrency type</span>
              <Dropdown.Button overlay={buyToMenu} style={{ width: '50%' }}>
                {this.state.buyToSym}
              </Dropdown.Button>
            </div>
            <Button
              style={{ margin: '8px', width: '88%', borderRadius: '10px' }}
              type="primary"
              onClick={() => this.onBuy()}
              disabled={
                !this.props.idToken ||
                !this.state.buyAmount ||
                !this.state.buyPrice
              }
            >
              Buy
            </Button>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            margin: '5px',
          }}
        >
          <p
            style={{
              width: '35%',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              backgroundColor: 'rgb(225,110,174)',
              color: 'white',
              textAlign: 'center',
              fontStyle: 'bold',
              fontSize: '20px',
              margin: 0,
            }}
          >
            <b>Selling</b>
          </p>
          <div
            style={{
              border: 'solid',
              borderTopRightRadius: '10px',
              borderBottomRightRadius: '10px',
              borderBottomLeftRadius: '10px',
              borderColor: 'rgb(225,110,174)',
              borderWidth: 2,
              margin: 0,
            }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <span style={{ width: '40%', fontSize: '20px' }}>Price</span>
              <InputNumber
                style={{ width: '50%', fontSize: '20px' }}
                key="0"
                min={0.0001}
                defaultValue={10000}
                value={this.state.sellPrice}
                onChange={value => this.onChangeSellPrice(value)}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <span style={{ width: '40%', fontSize: '20px' }}>Amount</span>
              <InputNumber
                style={{ width: '50%', fontSize: '20px' }}
                key="1"
                min={0.0001}
                defaultValue={1}
                value={this.state.sellAmount}
                onChange={value => this.onChangeSellAmount(value)}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <span style={{ width: '40%' }}>Using balance</span>
              <Dropdown.Button overlay={buyFromMenu} style={{ width: '50%' }}>
                {this.state.buyFromSym}
              </Dropdown.Button>
            </div>

            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <span style={{ width: '40%' }}>Cryptocurrency type</span>
              <Dropdown.Button overlay={buyToMenu} style={{ width: '50%' }}>
                {this.state.buyToSym}
              </Dropdown.Button>
            </div>

            <Button
              style={{
                margin: '8px',
                width: '88%',
                borderRadius: '10px',
                fontSize: '20px',
              }}
              type="primary"
              onClick={() => this.onSell()}
              disabled={
                !this.props.idToken ||
                !this.state.sellAmount ||
                !this.state.sellPrice
              }
            >
              Sell
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

Transaction.propTypes = {
  onSell: PropTypes.func,
  onBuy: PropTypes.func,
  idToken: PropTypes.string,
  isModalOpen: PropTypes.bool,
  text: PropTypes.string,
  toggleTradingResponseModal: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    idToken: state.auth.idToken,
    isModalOpen: state.modal.tradingResponseModal.isOpen,
    text: state.modal.tradingResponseModal.text,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBuy: payload => dispatch(userActions.sagaRequestTrading(payload)),
    onSell: payload => dispatch(userActions.sagaRequestTrading(payload)),
    toggleTradingResponseModal: (text, isOpen) =>
      dispatch(userActions.toggleTradingResponseModal(text, isOpen)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
