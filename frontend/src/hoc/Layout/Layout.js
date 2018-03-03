import React, {Component} from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Navigation from '../../components/Navigation/Navigation';
import Toolbar from '../../components/Toolbar/Toolbar';
import Databoard from '../../components/Databoard/Databoard';

class Layout extends Component {
    
    render() {
       return(
            <Aux>
                <Toolbar />
                <Navigation />
                <Databoard />
            </Aux>
       );
   }
}

export default Layout;