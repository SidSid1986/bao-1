import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'

import SideMenu from './SideMenu.js'

import Test from '../../views/dashboard/Test'

const { Content } = Layout

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
    <Layout style={{ height: '100%' }}>
      <SideMenu />
      <Layout>
        <Content style={{ margin: '24px 16px 0' }}>
          <Route component={Test} path="/dashboard/test" />
        </Content>
      </Layout>
    </Layout> 
    )
  }
}
 
export default Dashboard