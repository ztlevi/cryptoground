import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Row, Button, Col, Layout, Menu, Breadcrumb, Icon } from 'antd';
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
      userName: '',
      passWord: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.uid) {
      this.setState({ userStatus: 1 });
    } else {
      this.setState({ userStatus: 0 });
    }
  }

  userNameEmitEmpty = () => {
    this.userNameInput.focus();
    this.setState({ userName: '' });
  };
  passWordEmitEmpty = () => {
    this.passWordInput.focus();
    this.setState({ passWord: '' });
  };
  onChangeUserName = e => {
    this.setState({ userName: e.target.value });
  };
  onChangePassWord = e => {
    this.setState({ passWord: e.target.value });
  };

  render() {
    const { userName, passWord } = this.state;
    const suffix = userName ? (
      <Icon type="close-circle" onClick={this.userNameEmitEmpty} />
    ) : null;

    const suffix2 = passWord ? (
      <Icon type="close-circle" onClick={this.passWordEmitEmpty} />
    ) : null;

    return (
      <Header className="header" style={{ paddingLeft: 0 }}>
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
          selectable={false}
        >
<<<<<<< Updated upstream
          <Menu.Item key="1">
            <Icon type="rocket" style={{ fontSize: '250%' }} />
            <span style={{ fontSize: '170%' }}>CryptoGround</span>
=======
          <Menu.Item style={{ width: '200px' }} key="1">
            <Icon type="rocket" />
            <span style={{ fontSize: '20px' }}>Cryptoground</span>
>>>>>>> Stashed changes
          </Menu.Item>

          {/* userName and Password input here */}
          {this.state.userStatus === 0 && (
            <Menu.Item key="input_userName">
              <Input
                placeholder="Enter your username"
                prefix={
                  <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                suffix={suffix}
                value={userName}
                onChange={this.onChangeUserName}
                ref={node => (this.userNameInput = node)}
              />
            </Menu.Item>
          )}
          {this.state.userStatus === 0 && (
            <Menu.Item key="input_passWord">
              <Input
                placeholder="Enter your password"
                prefix={
                  <Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />
                }
                type="password"
                suffix={suffix2}
                value={passWord}
                onChange={this.onChangePassWord}
                ref={node => (this.passWordInput = node)}
              />
            </Menu.Item>
          )}

          {this.state.userStatus === 0 && (
            <Menu.Item key="2" className="float-right">
              <Button
                onClick={() =>
                  this.props.onSignUp(this.state.userName, this.state.passWord)
                }
              >
                <Icon type="user-add" />Sign up
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
                <Icon type="login" />Sign in
              </Button>
            </Menu.Item>
          )}

          {this.state.userStatus === 1 && (
            <Menu.Item key="3" className="float-right">
              <Button>
                <Icon type="user" />
                {this.props.userName || 'User'}
              </Button>
            </Menu.Item>
          )}
          {this.state.userStatus === 1 && (
            <Menu.Item key="4" className="float-right">
              <Button onClick={() => this.props.onSignOut()}>
                <Icon type="logout" />Sign out
              </Button>
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
  userName: PropTypes.string,
};

const mapStateToProps = state => {
  return {
    auth: state.auth,
    userName: state.user.email,
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
