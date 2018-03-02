import React from 'react';
import classes from './Toolbar.css';
import Logo from '../Logo/Logo';
import NavigationItems from '../Navigation/NavigationItems/NavigationItems';


const toolbar = (props) => (
    <header className={classes.Toolbar}>
            <div className={[classes.Logo,"col"].join(' ')}>
                <Logo />
            </div>
            <div className={[classes.Title,"col-8"].join(' ')}>
                <p>Cryptocurrency Exchange</p>
            </div>
            <NavigationItems />
    </header>
); 

export default toolbar;