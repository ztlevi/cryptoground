import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import axios from 'axios';
import * as dataActions from '../actions/data';
import classes from './Chart.css';
import AmCharts from '@amcharts/amcharts3-react';
import { Button } from 'antd';

// Generate random data
function generateData() {
    var firstDate = new Date();

    var dataProvider = [];

    for (var i = 0; i < 100; ++i) {
      var date = new Date(firstDate.getTime());

      date.setDate(i);

      dataProvider.push({
        date: date,
        value: Math.floor(Math.random() * 100)
      });
    }

    return dataProvider;
}

// Component which contains the dynamic state for the chart
class HistoricalData extends Component {
    constructor(props) {
        super(props);

        this.state = {
          dataProvider: generateData(),
          timer: null
        };
    }

    componentDidMount() {
        // this.setState({
        //   // Update the chart dataProvider every 3 seconds
        //   timer: setInterval(() => {
        //     this.setState({
        //       dataProvider: generateData()
        //     });
        //   }, 3000)
        // });
        //this.props.onStartFetchDaylyData();
    }

    componentWillUnmount() {
        //clearInterval(this.state.timer);
        //this.props.onStopFetchDaylyData();
    }
    
    onStart() {
        this.props.onStartFetchDaylyData();
    }

    onStop() {
        this.props.onStopFetchDaylyData();
    }

    render() {
        let data = this.props.data;
        console.log('rendered', data);

        const config = {
            "type": "serial",
            "theme": "light",
            "marginRight": 40,
            "marginLeft": 40,
            "autoMarginOffset": 20,
            "mouseWheelZoomEnabled": true,
            "valueAxes": [{
              "id": "v1",
              "axisAlpha": 0,
              "position": "left",
              "ignoreAxisWidth": true
            }],
            "balloon": {
              "borderThickness": 1,
              "shadowAlpha": 0
            },
            "graphs": [{
              "id": "g1",
              "balloon":{
                "drop": true,
                "adjustBorderColor": false,
                "color":"#ffffff"
              },
              "bullet": "round",
              "bulletBorderAlpha": 1,
              "bulletColor": "#FFFFFF",
              "bulletSize": 5,
              "hideBulletsCount": 50,
              "lineThickness": 2,
              "title": "red line",
              "useLineColorForBulletBorder": true,
              "valueField": "value",
              "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
            }],
            "chartScrollbar": {
              "graph": "g1",
              "oppositeAxis": false,
              "offset":30,
              "scrollbarHeight": 80,
              "backgroundAlpha": 0,
              "selectedBackgroundAlpha": 0.1,
              "selectedBackgroundColor": "#888888",
              "graphFillAlpha": 0,
              "graphLineAlpha": 0.5,
              "selectedGraphFillAlpha": 0,
              "selectedGraphLineAlpha": 1,
              "autoGridCount": true,
              "color":"#AAAAAA"
            },
            "chartCursor": {
              "pan": true,
              "valueLineEnabled": true,
              "valueLineBalloonEnabled": true,
              "cursorAlpha":1,
              "cursorColor":"#258cbb",
              "limitToGraph":"g1",
              "valueLineAlpha":0.2,
              "valueZoomable": true
            },
            "valueScrollbar":{
              "oppositeAxis": false,
              "offset":50,
              "scrollbarHeight":10
            },
            "categoryField": "date",
            "categoryAxis": {
              "parseDates": true,
              "dashLength": 1,
              "minorGridEnabled": true
            },
            "dataProvider": this.state.dataProvider
        };

        return (
            <div id="#historicalData" className={classes.intraday}>
               <p className={[classes.intradayintro, "col"].join(' ')}>Historical Dataflow </p>
               <AmCharts.React style={{width: "100%", height: "350px"}} options={config} />
               <Button type="primary" onClick={()=>this.onStart()}>Start</Button>
               <Button type="primary" onClick={()=>this.onStop()}>Stop</Button>
            </div>

        );
    }
}

HistoricalData.propTypes = {
  onStartFetchDaylyData: PropTypes.func,
  onStopFetchDaylyData: PropTypes.func,
  data: PropTypes.object
}

const mapStateToProps = state => {
  return {
      data: state.data.batchData
  }
};

const mapDispatchToProps = dispatch => {
  return {
      onStartFetchDaylyData: () => dispatch( dataActions.sagaStartSyncBatchDaylyData() ),
      onStopFetchDaylyData: () => dispatch( dataActions.sagaStopSyncBatchDaylyData() ) 
  };
}

export default connect( 
  mapStateToProps,
  mapDispatchToProps
)(HistoricalData);
