import React from 'react';
import {NavLink} from 'react-router-dom';

import classes from './NavigationItems.css';

var style = {
    margin: '10px',
    'fontWeight': 'bold'
}
const navigationItems = () => (
    <div className ={[classes.NavigationItems,"col-3"].join(' ')}>
        <button type="button" className="btn btn-light col" style={style}>Sign Up</button>
        <button type="button" className="btn btn-dark col" style={style}>Sign In</button>
    </div>
  );
  
  export default navigationItems;