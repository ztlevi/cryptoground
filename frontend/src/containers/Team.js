import React, { Component } from 'react';
import { Row, Col } from 'antd';
import { List, Avatar, Button } from 'antd';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import zhouting from '../assets/zhouting.jpg';
import liwei from '../assets/liwei.jpg';
import shijian from '../assets/shijian.png';
import wangjunzhi from '../assets/wangjunzhi.jpg';
import classes from './team.css';

import * as userActions from '../actions/user';

export default class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  render() {
    return(
      <div>
        <div className={classes.card}>
          <div style={{padding: "15px 0", height: "220px"}}>
          <img src={wangjunzhi} style={{maxHeight:"220px", maxWidth:"220px"}}/>
          </div>
          <h2>Junzhi Wang</h2>
          <p className={classes.title}>Full Stack</p>
          <p>University of Southern California</p>
          <a href="#"><i className="fa fa-dribbble"></i></a> 
          <a href="#"><i className="fa fa-twitter"></i></a> 
          <a href="#"><i className="fa fa-linkedin"></i></a> 
          <a href="#"><i className="fa fa-facebook"></i></a>
          <p><button>Contact</button></p>
        </div>
        <div className={classes.card}>
          <img src={zhouting} style={{maxHeight:"220px", maxWidth:"220px"}}/>
          <h2>Ting Zhou</h2>
          <p className={classes.title}>Fulll Stack</p>
          <p>University of Michigan</p>
          <br/>
          <a href="#"><i className="fa fa-dribbble"></i></a> 
          <a href="#"><i className="fa fa-twitter"></i></a> 
          <a href="#"><i className="fa fa-linkedin"></i></a> 
          <a href="#"><i className="fa fa-facebook"></i></a>
          <p><button>Contact</button></p>
        </div>
        <div className={classes.card}>
          <img src={liwei} style={{maxHeight:"220px", maxWidth:"220px"}}/>
          <h2>Wei Li</h2>
          <p className={classes.title}>Full Stack</p>
          <p>University of Southern California</p>
          <a href="#"><i className="fa fa-dribbble"></i></a> 
          <a href="#"><i className="fa fa-twitter"></i></a> 
          <a href="#"><i className="fa fa-linkedin"></i></a> 
          <a href="#"><i className="fa fa-facebook"></i></a>
          <p><button>Contact</button></p>
        </div>
        <div className={classes.card}>
          <div style={{padding: "35px 0", height: "220px"}}>
          <img src={shijian} aline="middel" style={{maxHeight:"220px", maxWidth:"220px", margin:"auto 0"}}/>
          </div>
          <h2>Jian Shi</h2>
          <p className={classes.title}>Full Stack</p>
          <p>University of Southern California</p>
          <a href="#"><i className="fa fa-dribbble"></i></a> 
          <a href="#"><i className="fa fa-twitter"></i></a> 
          <a href="#"><i className="fa fa-linkedin"></i></a> 
          <a href="#"><i className="fa fa-facebook"></i></a>
          <p><button>Contact</button></p>
        </div>
      </div>

    )


  }
}
