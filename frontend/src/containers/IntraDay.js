import React, { Component } from 'react';
import PropTypes from 'prop-types';
//import axios from 'axios';
import { connect } from 'react-redux';
import { Row, Button, Col, Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider } = Layout;
import { buttonStyle } from '../styles/GlobalStyles';

import AmCharts from '@amcharts/amcharts3-react';
import * as dataActions from '../actions/data';

//import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// const instance = axios.create({
// baseURL: 'https://min-api.cryptocompare.com/data'
// });

// Component which contains the dynamic state for the chart
class IntraDay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProvider: {},
    };
  }

  generateData(props) {
    var dataProvider = [];
    var data = props.data.batchData['BTC'];
    data = data['USD'];
    data = data['minute'];
    for (var key in data) {
      var date = new Date(data[key]['time'] * 1000);
      date.setDate(date.getDate());
      date.setHours(date.getHours());
      date.setMinutes(date.getMinutes());
      dataProvider.push({
        date: date,
        open: data[key]['open'],
        close: data[key]['close'],
        high: data[key]['high'],
        low: data[key]['low'],
        volumn: data[key]['volumnto'] - data[key]['volumnfrom'],
      });
    }
    return dataProvider;
  }

  componentWillReceiveProps(nextProps) {
    //console.log('next', nextProps.data.batchData);
    this.setState({
      // Update the chart dataProvider
      dataProvider: this.generateData(nextProps),
    });
  }

  onStart() {
    this.props.onStartFetchBatchIntradayData();
  }

  onStop() {
    this.props.onStopFetchBatchIntradayData();
  }

  componentDidMount() {
    this.onStart();
  }

  componentWillUnmount() {
    this.onStop();
  }

  render() {
    const config = {
      type: 'stock',
      theme: 'light',
      categoryAxesSettings: {
        minPeriod: 'mm',
      },
      dataSets: [
        {
          fieldMappings: [
            {
              fromField: 'open',
              toField: 'open',
            },
            {
              fromField: 'close',
              toField: 'close',
            },
            {
              fromField: 'high',
              toField: 'high',
            },
            {
              fromField: 'low',
              toField: 'low',
            },
            {
              fromField: 'volume',
              toField: 'volume',
            },
            {
              fromField: 'value',
              toField: 'value',
            },
          ],
          color: '#7f8da9',
          dataProvider: this.state.dataProvider,
          categoryField: 'date',
        },
      ],
      balloon: {
        horizontalPadding: 13,
      },
      panels: [
        {
          title: 'Value',
          stockGraphs: [
            {
              id: 'g1',
              type: 'candlestick',
              openField: 'open',
              closeField: 'close',
              highField: 'high',
              lowField: 'low',
              valueField: 'close',
              lineColor: '#7f8da9',
              fillColors: '#7f8da9',
              negativeLineColor: '#db4c3c',
              negativeFillColors: '#db4c3c',
              fillAlphas: 1,
              balloonText:
                'open:<b>[[open]]</b><br>close:<b>[[close]]</b><br>low:<b>[[low]]</b><br>high:<b>[[high]]</b>',
              useDataSetColors: false,
            },
          ],
        },
      ],
      scrollBarSettings: {
        graphType: 'line',
        usePeriod: 'WW',
      },
      panelsSettings: {
        panEventsEnabled: true,
      },
      cursorSettings: {
        valueBalloonsEnabled: true,
        valueLineBalloonEnabled: true,
        valueLineEnabled: true,
      },
      periodSelector: {
        position: 'bottom',
        dateFormat: 'YYYY-MM-DD JJ:NN',
        inputFieldWidth: 170,
        periods: [
          {
            period: 'hh',
            count: 1,
            label: '1 hour',
          },
          {
            period: 'hh',
            count: 2,
            label: '2 hours',
          },
          {
            period: 'hh',
            count: 5,
            selected: true,
            label: '5 hour',
          },
          {
            period: 'hh',
            count: 12,
            label: '12 hours',
          },
          {
            period: 'MAX',
            label: 'MAX',
          },
        ],
      },
    };

    return (
      <div style={{ marginLeft: 10, marginTop: 15 }}>
        <h4 style={{ textAlign: 'center' }}>Intra-day Dataflow</h4>
        <AmCharts.React
          style={{ width: '100%', height: '350px' }}
          options={config}
        />
      </div>
    );
  }
}

IntraDay.propTypes = {
  onStartFetchBatchIntradayData: PropTypes.func,
  onStopFetchBatchIntradayData: PropTypes.func,
  data: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartFetchBatchIntradayData: () =>
      dispatch(dataActions.sagaStartSyncBatchIntradayData()),
    onStopFetchBatchIntradayData: () =>
      dispatch(dataActions.sagaStopSyncBatchIntradayData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IntraDay);
