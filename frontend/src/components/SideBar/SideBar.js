import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';

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
              <NavLink to="/charts">
                <span>
                  <Icon type="line-chart" />
                  <span>Chart</span>
                </span>
              </NavLink>
            }
          >
            <Menu.Item key="chart1">
              <NavLink to="/charts/intraday">Intray Day</NavLink>
            </Menu.Item>
            <Menu.Item key="chart2">
              <NavLink to="/charts/histoday">Historical Data</NavLink>
            </Menu.Item>
            <Menu.Item key="chart3">
              <NavLink to="/trading">Trading Form</NavLink>
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
            <Menu.Item key="user1">
              <NavLink to="/user/account">Account</NavLink>
            </Menu.Item>
            <Menu.Item key="user2">
              <NavLink to="/user/history">Trading History</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="rank">
            <NavLink to="/ranking">
              <Icon type="bars" />
              <span>Ranking</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="team">
            <NavLink to="/team">
              <Icon type="team" />
              <span>Team</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
