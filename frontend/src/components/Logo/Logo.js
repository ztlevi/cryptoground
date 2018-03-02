import React from 'react';

import bitcoin  from "../../assets/bitcoin.png";
import classes from './Logo.css';

const logo = ( props ) => (
    <div className={classes.Logo} style={{height: props.height}}>
        <img src={bitcoin} alt="CryptoCurrency"/>
    </div>
);

export default logo;