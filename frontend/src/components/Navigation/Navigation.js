import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';

const navigation = () => (
  <div >
    <ul className = "nav nav-pills nav-fill">
      <li className = "nav-item nav-link">  
        <NavLink to='/' exact>Historical Daily Data</NavLink>
      </li>
      <li className = "nav-item nav-link">
        <NavLink to='/'>Intra-day Data</NavLink>
      </li>
      <li className = "nav-item nav-link">
        <NavLink to='/'>Trading</NavLink>
      </li>
    </ul>
  </div>
);

export default navigation;