import React, {Component} from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Navigation from '../../components/Navigation/Navigation';
import Toolbar from '../../components/Toolbar/Toolbar';

class Layout extends Component {
    
    render() {
       return(
            <Aux>
                <Toolbar />
                <Navigation />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
       );
   }
}

export default Layout;