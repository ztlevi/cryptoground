import React, { Component } from 'react';
//import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as dataActions from '../actions/data';
import classes from './table.css';

function generateData() {
    var currency = [];
    var i = 0;
    currency.push({
       key: i,
       name: 'Bitcoin',
       price: 11418
    });
    i += 1;
    currency.push({
        key: i,
        name: 'Ethereum',
        price: 865
    });
    i += 1;
    currency.push({
        key: i,
        name: 'Ripple',
        price: 0.908
    });
    i += 1;
    currency.push({
        key: i,
        name: 'Bitcoin Cash',
        price: 1282
    });
    i += 1;
    currency.push({
        key: i,
        name: 'Cardano',
        price: 0.294668
    });

    //console.log(currency);
    return currency;
}

class CurrentCurrency extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          dataProvider: generateData()
        };
    }

    componentDidMount() {
        this.props.onStartFetchRealTimeData();
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
                            <th> Price($) </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           this.state.dataProvider.map(item =>(
                               <tr key={item.key}>
                                   <td> {item.name} </td>
                                   <td> {item.price} </td>
                                </tr>
                           ))
                        }
                    </tbody>                   
                </table>
            </div>
        );
    }
}

CurrentCurrency.propTypes = {
    onStartFetchRealTimeData: PropTypes.func,
    data: PropTypes.object
}

const mapStateToProps = state => {
    return {
        data: state.data
    }
};
  
const mapDispatchToProps = dispatch => {
    return {
        onStartFetchRealTimeData: () => dispatch( dataActions.sagaSyncRealTimePricing() )
    }
}
  
export default connect( 
    mapStateToProps,
    mapDispatchToProps
)(CurrentCurrency);
