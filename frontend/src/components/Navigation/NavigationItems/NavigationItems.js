import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact active>Home</NavigationItem>
        <NavigationItem link="/">Sign In</NavigationItem>
        <NavigationItem link="/">Sign Up</NavigationItem>
    </ul>
);

export default NavigationItems;