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
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={['1']}
          style={{ lineHeight: '64px' }}
          selectable={false}
        >
          <Menu.Item key="1">
            <Icon type="rocket" />
            <span>Cryptoground</span>
          </Menu.Item>

          {/* userName and Password input here */}
          <Menu.Item key="input_userName">
            <Input
              placeholder="Enter your username"
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              suffix={suffix}
              value={userName}
              onChange={this.onChangeUserName}
              ref={node => (this.userNameInput = node)}
            />
          </Menu.Item>
          <Menu.Item key="input_passWord">
            <Input
              placeholder="Enter your password"
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              suffix={suffix2}
              value={passWord}
              onChange={this.onChangePassWord}
              ref={node => (this.passWordInput = node)}
            />
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
