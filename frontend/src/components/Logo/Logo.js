import React from 'react';

import bitcoin from '../../assets/bitcoin.png';
import classes from './Logo.css';

const logo = props => (
  <div className={classes.Logo}>
    <img src={bitcoin} alt="CryptoCurrency" />
  </div>
);

export default logo;
