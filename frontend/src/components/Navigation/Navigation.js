import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Row, Button, Col, Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Sider } = Layout;

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userStatus: 0,
    };
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
            <Icon type="rocket" />Cryptocurrency Exchange
          </Menu.Item>
          {this.state.userStatus === 0 && (
            <Menu.Item key="2" className="float-right">
              <Button>Sign up</Button>
            </Menu.Item>
          )}
          {this.state.userStatus === 0 && (
            <Menu.Item key="3" className="float-right">
              <Button>Sign in</Button>
            </Menu.Item>
          )}
          {this.state.userStatus === 1 && (
            <Menu.Item key="3" className="float-right">
              <Button>
                <Icon type="user" />User
              </Button>
            </Menu.Item>
          )}
        </Menu>
      </Header>
    );
  }
}

export default Navigation;
