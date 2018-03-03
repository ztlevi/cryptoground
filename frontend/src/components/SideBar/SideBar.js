import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapsed: false,
    };
  }

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Sider
        collapsible
        collapsed={this.state.collapsed}
        onCollapse={this.onCollapse}
      >
        <div className="logo" />
        <Menu theme="dark" mode="inline">
          <SubMenu
            key="chart"
            title={
              <span>
                <Icon type="line-chart" />
                <span>Chart</span>
              </span>
            }
          >
            <Menu.Item key="chart1">
              <Link to="#intrayDay">Intray Day</Link>
            </Menu.Item>
            <Menu.Item key="chart2">
              <Link to="#historicalData">Historical Data</Link>
            </Menu.Item>
            <Menu.Item key="chart3">
              <Link to="#tradingForm">Trading Form</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="user"
            title={
              <span>
                <Icon type="user" />
                <span>User</span>
              </span>
            }
          >
            <Menu.Item key="user1">Account</Menu.Item>
            <Menu.Item key="user2">Trading History</Menu.Item>
          </SubMenu>
          <Menu.Item key="rank">
            <Icon type="bars" />
            <span>Ranking</span>
          </Menu.Item>
          <Menu.Item key="team">
            <Icon type="team" />
            <span>Team</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
