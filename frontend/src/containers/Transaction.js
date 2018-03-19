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
      buyPrice: 10000,
      buyAmount: 1,
      sellPrice: 10000,
      sellAmount: 1,
      buyFromSym: 'USD',
      buyToSym: 'BTC',
      sellFromSym: 'BTC',
      sellToSym: 'USD',
      confirmModal: false,
      transType: null,
    };
  }

  onChangeBuyPrice(value) {
    this.setState({
      buyPrice: value,
    });
    console.log('onChangeBuyPrice', value);
  }

  onChangeBuyAmount(value) {
    this.setState({
      buyAmount: value,
    });
    console.log('onChangeBuyAmount', value);
  }

  onChangeSellPrice(value) {
    this.setState({
      sellPrice: value,
    });
    console.log('onChangeSellPrice', value);
  }

  onChangeSellAmount(value) {
    this.setState({
      sellAmount: value,
    });
    console.log('onChangeSellAmount', value);
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

  onConfirm() {
    if (this.state.transType === 'BUY') {
      this.onBuy();
    } else if (this.state.transType === 'SELL') {
      this.onSell();
    }
    this.setState({
      confirmModal: false,
    });
  }

  onClickSell() {
    this.setState({
      confirmModal: true,
      transType: 'SELL',
    });
  }

  onClickBuy() {
    this.setState({
      confirmModal: true,
      transType: 'BUY',
    });
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
    this.setState({
      confirmModal: false,
    });
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
          title=" "
          visible={this.props.isModalOpen}
          onOk={e => this.handleOk(e)}
          onCancel={e => this.handleOk(e)}
          footer={null}
          wrapClassName="vertical-center-modal"
        >
          {this.props.text}
        </Modal>
        <Modal
          title=" "
          visible={this.state.confirmModal}
          onOk={() => this.onConfirm()}
          onCancel={e => this.handleOk(e)}
          okText="confirm"
          cancelText="cancel"
          wrapClassName="vertical-center-modal"
        >
          Please confirm this transaction request or cancel it.
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
              padding: '15px',
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: '10px',
              }}
            >
              <span style={{ width: '40%' }}>Price</span>
              <InputNumber
                style={{ width: '50%', fontSize: '20px' }}
                key="0"
                defaultValue={10000}
                formatter={value =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                min={0.0001}
                value={this.state.buyPrice}
                onChange={value => this.onChangeBuyPrice(value)}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <span style={{ width: '40%', fontSize: '20px' }}>Amount</span>
              <InputNumber
                style={{ width: '50%', fontSize: '20px' }}
                key="1"
                defaultValue={1}
                min={0.0001}
                onChange={value => this.onChangeBuyAmount(value)}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <span style={{ width: '40%', fontSize: '20px' }}>
                Using balance
              </span>
              <Dropdown.Button overlay={buyFromMenu}>
                {this.state.buyFromSym}
              </Dropdown.Button>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <span style={{ width: '40%', fontSize: '20px' }}>
                Cryptocurrency type
              </span>
              <Dropdown.Button overlay={buyToMenu}>
                {this.state.buyToSym}
              </Dropdown.Button>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '8px' }}
            >
              <span style={{ width: '40%' }}>USD balance</span>

              <span style={{ width: '50%', fontSize: '20px' }}>
                {'$' + this.props.balance['USD']}
              </span>
            </div>

            <Button
              style={{
                margin: '8px',
                width: '88%',
                borderRadius: '10px',
                fontSize: '20px',
              }}
              type="primary"
              onClick={() => this.onClickBuy()}
              disabled={
                !this.props.idToken ||
                this.state.buyAmount <= 0 ||
                this.state.buyPrice <= 0
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
              padding: '15px',
            }}
          >
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <span style={{ width: '40%', fontSize: '20px' }}>Price</span>
              <InputNumber
                style={{ width: '50%', fontSize: '20px' }}
                key="0"
                defaultValue={10000}
                min={0.0001}
                formatter={value =>
                  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                }
                value={this.state.sellPrice}
                onChange={value => this.onChangeSellPrice(value)}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <span style={{ width: '40%', fontSize: '20px' }}>Amount</span>
              <InputNumber
                defaultValue={1}
                min={0.0001}
                key="1"
                onChange={value => this.onChangeSellAmount(value)}
                style={{ width: '50%', fontSize: '20px' }}
              />
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <span style={{ width: '40%', fontSize: '20px' }}>
                Cryptocurrency type
              </span>
              <Dropdown.Button overlay={sellFromMenu}>
                {this.state.sellFromSym}
              </Dropdown.Button>
            </div>

            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '10px' }}
            >
              <span style={{ width: '40%', fontSize: '20px' }}>
                Using balance
              </span>
              <Dropdown.Button overlay={sellToMenu}>
                {this.state.sellToSym}
              </Dropdown.Button>
            </div>
            <div
              style={{ display: 'flex', flexDirection: 'row', margin: '8px' }}
            >
              <span style={{ width: '40%' }}>BTC balance</span>

              <span style={{ width: '50%', fontSize: '20px' }}>
                {this.props.balance['BTC'] + '  BTC'}
              </span>
            </div>

            <Button
              style={{
                margin: '8px',
                width: '88%',
                borderRadius: '10px',
                fontSize: '20px',
              }}
              type="primary"
              onClick={() => this.onClickSell()}
              disabled={
                !this.props.idToken ||
                this.state.sellAmount <= 0 ||
                this.state.sellPrice <= 0
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
  balance: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    idToken: state.auth.idToken,
    isModalOpen: state.modal.tradingResponseModal.isOpen,
    text: state.modal.tradingResponseModal.text,
    balance: state.user.balance,
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
