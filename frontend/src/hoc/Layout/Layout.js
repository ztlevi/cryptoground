import React, {Component} from 'react';

import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Navigation from '../../components/Navigation/Navigation';
import Toolbar from '../../components/Toolbar/Toolbar';
import IntraDay from '../../containers/IntraDay';
import { Button } from 'antd';

class Layout extends Component {
    
    render() {
       return(
            <Aux>
                <Toolbar />
                <Navigation />
                <IntraDay />
                <Button type="primary">Button</Button>
            </Aux>
       );
   }
}

export default Layout;