import React, { Component } from 'react';
//import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as dataActions from '../actions/data';

class CurrentCurrency extends Component {
  generateData(props) {
    var currency = [];
    var i = 0;
    var data = props.data.realTimePrice;
    for (var key in data) {
      currency.push({
        key: i,
        name: key,
        USD: data[key]['USD'],
        EUR: data[key]['EUR'],
      });
      i += 1;
    }

    //console.log(currency);
    return currency;
  }

  constructor(props) {
    super(props);

    this.state = {
      dataProvider: [],
      timer: null,
    };
  }

  onStart() {
    this.props.onStartFetchRealTimeData();
  }

  onStop() {
    this.props.onStopFetchRealTimeData();
  }

  componentWillReceiveProps(nextProps) {
    //console.log('next', nextProps.data.realTimePrice)
    this.setState({
      dataProvider: this.generateData(nextProps),
    });
    //console.log('props', props.data.realTimePrice)
  }

  componentDidMount() {
    this.onStart();
  }

  componentWillUnmount() {
    this.onStop();
  }

  render() {
    //console.log(this.state.dataProvider);
    return (
      <div style={{ marginLeft: 10, marginTop: 15 }}>
        <h4 style={{ textAlign: 'center' }}>Cryptocurrency Market</h4>
        <table className="table" style={{ fontSize: 15, textAlign: 'center' }}>
          <thead>
            <tr>
              <th> Name </th>
              <th> USD </th>
              <th> EUR </th>
            </tr>
          </thead>
          <tbody>
            {this.state.dataProvider.map(item => (
              <tr key={item.key}>
                <td> {item.name} </td>
                <td> {item.USD} </td>
                <td> {item.EUR} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

CurrentCurrency.propTypes = {
  onStartFetchRealTimeData: PropTypes.func,
  onStopFetchRealTimeData: PropTypes.func,
  data: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    data: state.data,
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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentCurrency);
