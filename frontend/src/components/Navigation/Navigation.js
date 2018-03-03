import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Button, Col, Layout, Menu, Breadcrumb, Icon } from 'antd';
import PropTypes from 'prop-types';
//import axios from 'axios';
import { connect } from 'react-redux';

import * as authActions from '../../actions/auth';
const { Header, Content, Sider } = Layout;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userStatus: 0,
      userName: 'junzhiwa@usc.edu',
      passWord: 'password',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.uid) {
      this.setState({ userStatus: 1 });
    } else {
      this.setState({ userStatus: 0 });
    }
  }

  render() {
    return (
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
        >
          <Menu.Item key="1">
            <Icon type="rocket" />
            <span>Cryptoground</span>
          </Menu.Item>
          {this.state.userStatus === 0 && (
            <Menu.Item key="2" className="float-right">
              <Button
                onClick={() =>
                  this.props.onSignUp(this.state.userName, this.state.passWord)
                }
              >
                Sign up
              </Button>
            </Menu.Item>
          )}
          {this.state.userStatus === 0 && (
            <Menu.Item key="3" className="float-right">
              <Button
                onClick={() =>
                  this.props.onSignIn(this.state.userName, this.state.passWord)
                }
              >
                Sign in
              </Button>
            </Menu.Item>
          )}
          {this.state.userStatus === 1 && (
            <Menu.Item key="3" className="float-right">
              <Button>
                <Icon type="user" />User
              </Button>
            </Menu.Item>
          )}
          {this.state.userStatus === 1 && (
            <Menu.Item key="4" className="float-right">
              <Button onClick={() => this.props.onSignOut()}>Sign out</Button>
            </Menu.Item>
          )}
        </Menu>
      </Header>
    );
  }
}

Navigation.propTypes = {
  onSignIn: PropTypes.func,
  onSignUp: PropTypes.func,
  onSignOut: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: (userName, passWord) =>
      dispatch(authActions.sagaSignUp(userName, passWord)),
    onSignIn: (userName, passWord) =>
      dispatch(authActions.sagaSignIn(userName, passWord)),
    onSignOut: () => {
      dispatch(authActions.authInit());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
