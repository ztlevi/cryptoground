import React, { Component } from 'react';

import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Router, Switch, NavLink, Redirect } from 'react-router-dom';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

import Navigation from '../../components/Navigation/Navigation';
import Databoard from '../../components/Databoard/Databoard';
import SideBar from '../../components/SideBar/SideBar';

class MyLayout extends Component {
  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Navigation />
        <Layout style={{ height: '100%' }}>
          <SideBar />
          <Layout style={{ height: '100%', padding: '0 24px 24px' }}>
            {/* <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb> */}
            <Content
              style={{
                background: '#fff',
                padding: 24,
                margin: 0,
                minHeight: 280,
              }}
            >
              <Databoard />
            </Content>
          </Layout>
        </Layout>
      </Layout>
    );
  }
}

export default MyLayout;
