import React, { Component } from 'react';
import { InputNumber, Button, Dropdown, Menu } from 'antd';

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
    payload.tradingPrice = this.state.buyPrice;
    payload.tradingAmount = this.state.buyAmount;
    payload.tradingFromSym = this.state.buyFromSym;
    payload.tradingToSym = this.state.buyToSym;
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
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <span>Buy price</span>
          <InputNumber
            key="0"
            min={0.0001}
            defaultValue={10000}
            value={this.state.buyPrice}
            onChange={value => this.onChangeBuyPrice(value)}
          />
          <span>Buy amount</span>
          <InputNumber
            key="1"
            min={0.0001}
            defaultValue={1}
            value={this.state.buyAmount}
            onChange={value => this.onChangeBuyAmount(value)}
          />
          <span>Buy using</span>
          <Dropdown.Button overlay={buyFromMenu}>
            {this.state.buyFromSym}
          </Dropdown.Button>
          <span>Buy symbol</span>
          <Dropdown.Button overlay={buyToMenu}>
            {this.state.buyToSym}
          </Dropdown.Button>
          <Button
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
        <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
          <span>Sell price</span>
          <InputNumber
            key="0"
            min={0.0001}
            defaultValue={10000}
            value={this.state.sellPrice}
            onChange={value => this.onChangeSellPrice(value)}
          />
          <span>Sell amount</span>
          <InputNumber
            key="1"
            min={0.0001}
            defaultValue={1}
            value={this.state.sellAmount}
            onChange={value => this.onChangeSellAmount(value)}
          />
          <span>Sell symbol</span>
          <Dropdown.Button overlay={sellFromMenu}>
            {this.state.sellFromSym}
          </Dropdown.Button>
          <span>Sell get</span>
          <Dropdown.Button overlay={sellToMenu}>
            {this.state.sellToSym}
          </Dropdown.Button>
          <Button
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
    );
  }
}

Transaction.propTypes = {
  onSell: PropTypes.func,
  onBuy: PropTypes.func,
  idToken: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    idToken: state.auth.idToken,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onBuy: payload => dispatch(userActions.sagaRequestTrading(payload)),
    onSell: payload => dispatch(userActions.sagaRequestTrading(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
