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
        <Menu theme="dark" mode="inline">
          <SubMenu
            key="chart"
            title={
              <NavLink to="/charts">
                <span>
                  <Icon type="line-chart" />
                  <span style={{ fontSize: '150%' }}>Chart</span>
                </span>
              </NavLink>
            }
          >
            <Menu.Item key="chart1" style={{ fontSize: '125%' }}>
              <NavLink to="/charts/intraday">Intray Day</NavLink>
            </Menu.Item>
            <Menu.Item key="chart2" style={{ fontSize: '125%' }}>
              <NavLink to="/charts/histoday">Historical Data</NavLink>
            </Menu.Item>
            <Menu.Item key="chart3" style={{ fontSize: '125%' }}>
              <NavLink to="/trading">Buy & Sell</NavLink>
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="user"
            title={
              <span>
                <Icon type="user" />
                <span style={{ fontSize: '150%' }}>User</span>
              </span>
            }
          >
            {/* <Menu.Item key="user1" style={{ fontSize: '125%' }}>
                <NavLink to="/user/account">Account</NavLink>
                </Menu.Item> */}
            <Menu.Item key="user2" style={{ fontSize: '125%' }}>
              <NavLink to="/user/history">Trading History</NavLink>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="rank">
            <NavLink to="/ranking">
              <Icon type="bars" />
              <span style={{ fontSize: '150%' }}>Ranking</span>
            </NavLink>
          </Menu.Item>
          <Menu.Item key="team">
            <NavLink to="/team">
              <Icon type="team" />
              <span style={{ fontSize: '150%' }}>Team</span>
            </NavLink>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}
