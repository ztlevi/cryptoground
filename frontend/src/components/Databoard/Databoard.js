import React, {Component} from 'react';

import IntraDay from '../../containers/IntraDay';
import HistoricalData from '../../containers/HistoricalData';
import CurrentCurrency from '../../containers/CurrentCurrency';

class Databoard extends Component {
    
    render() {
       return(
            <div>
                <IntraDay />
                <CurrentCurrency />
                <HistoricalData />              
            </div>
       );
   }
}

export default Databoard;