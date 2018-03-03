import React, { Component } from 'react';
//import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import * as dataActions from '../actions/data';
import classes from './table.css';


class CurrentCurrency extends Component {

    generateData(props) {
        var currency = [];
        var i = 0;
        var data = props.data.realTimePrice;
        for(var key in data){
            currency.push({
                key: i,
                name: key,
                USD: data[key]['USD'],
                EUR: data[key]['EUR']
            });
            i += 1;
        }
    
        //console.log(currency);
        return currency;
    }

    constructor(props) {
        super(props);

        this.state = {
          dataProvider:[],
          timer: null

        };
    }

    onStart() {
        this.props.onStartFetchRealTimeData();
    }

    onStop() {
        this.props.onStopFetchRealTimeData();
    }

    componentWillReceiveProps(nextProps) {
        // console.log('next', nextProps.data.realTimePrice)
        this.setState({
            dataProvider: this.generateData(nextProps)
        })
        //console.log('props', props.data.realTimePrice)
    }
    componentWillUnmount() {
        //clearInterval(this.state.timer);
    }

    render(){
       // console.log(this.state.dataProvider);
        let data = this.props.data;
        console.log(data);
        return (
            <div className ={classes.table}>
                <p className={classes.font}>CryptoCurrency Market</p>
                <div className = {classes.current}>
                    <p></p>
                </div>
                <table className = "table">
                    <thead>
                        <tr>
                            <th> Name </th>
                            <th> USD </th>
                            <th> EUR </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           this.state.dataProvider.map(item =>(
                               <tr key={item.key}>
                                   <td> {item.name} </td>
                                   <td> {item.USD} </td>
                                   <td> {item.EUR} </td>
                                </tr>
                           ))
                        }
                    </tbody>
                </table>
                <Button type="primary" onClick={()=>this.onStart()}>Start</Button>
                <Button type="primary" onClick={()=>this.onStop()}>Stop</Button>
            </div>
        );
    }
}

CurrentCurrency.propTypes = {
    onStartFetchRealTimeData: PropTypes.func,
    onStopFetchRealTimeData: PropTypes.func,
    data: PropTypes.object
}

const mapStateToProps = state => {
    return {
        data: state.data
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onStartFetchRealTimeData: () => dispatch( dataActions.sagaSyncRealTimePricing() ),
        onStopFetchRealTimeData: () => dispatch( dataActions.sagaStopSyncRealTimePricing() )
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CurrentCurrency);
