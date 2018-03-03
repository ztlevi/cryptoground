import React, {Component} from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Navigation from '../../components/Navigation/Navigation';
import Toolbar from '../../components/Toolbar/Toolbar';
import Databoard from '../../components/Databoard/Databoard';
//import TradingForm from '../../components/TradingForm/TradingForm';

class Layout extends Component {
    
    render() {
       return(
            <Aux>
                <Toolbar />
                <Navigation />
                <Databoard />
                {/**<TradingForm />**/}
            </Aux>
       );
   }
}

export default Layout;