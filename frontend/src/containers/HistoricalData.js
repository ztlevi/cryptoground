import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import axios from 'axios';
import * as dataActions from '../actions/data';
import AmCharts from '@amcharts/amcharts3-react';

// Component which contains the dynamic state for the chart
class HistoricalData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataProvider: {},
    };
  }

  generateData(props) {
    //console.log('in generateData', props.data.batchData);
    var dataProvider = [];
    var data = props.data.batchData['BTC'];
    data = data['USD'];
    data = data['day'];
    for (var key in data) {
      var date = new Date(data[key]['time'] * 1000);
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
    //this.props.onStartFetchDaylyData();
  }

  componentDidMount() {
    this.onStart();
  }

  componentWillUnmount() {
    this.onStop();
  }

  onStart() {
    this.props.onStartFetchDaylyData();
  }

  onStop() {
    this.props.onStopFetchDaylyData();
  }

  render() {
    const config = {
      type: 'stock',
      theme: 'light',
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
        inputFieldWidth: 120,
        periods: [
          {
            period: 'DD',
            count: 10,
            label: '10 days',
          },
          {
            period: 'MM',
            selected: true,
            count: 1,
            label: '1 month',
          },
          {
            period: 'YYYY',
            count: 1,
            label: '1 year',
          },
          {
            period: 'YTD',
            label: 'YTD',
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
        <h4 style={{ textAlign: 'center' }}>Historical Dataflow</h4>

        <AmCharts.React
          style={{ width: '100%', height: '350px' }}
          options={config}
        />
      </div>
    );
  }
}

HistoricalData.propTypes = {
  onStartFetchDaylyData: PropTypes.func,
  onStopFetchDaylyData: PropTypes.func,
  data: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    data: state.data,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onStartFetchDaylyData: () =>
      dispatch(dataActions.sagaStartSyncBatchDaylyData()),
    onStopFetchDaylyData: () =>
      dispatch(dataActions.sagaStopSyncBatchDaylyData()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HistoricalData);
