import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import { Layout } from 'antd'

import SideMenu from './SideMenu.js'
import TopHeader from './TopHeader'

import ReadOrder from '../../views/dashboard/ReadOrder'
import LoginLog from '../../views/dashboard/LoginLog'
import FinanceDetails from '../../views/dashboard/FinanceDetails'
import ReadQuery from '../../views/dashboard/ReadQuery'

const { Content } = Layout

class Dashboard extends Component {
  constructor(props) {
    super(props)
    this.state = {  }
  }
  render() { 
    return (
    <Layout style={{ height: '100%' }}>
      <SideMenu/>
      <Layout>
        <TopHeader/>
        <Content style={{ margin: '24px 16px 0' }}>
          <Route component={ReadOrder} path="/dashboard/readOrder" />
          <Route component={LoginLog} path="/dashboard/loginLog" />
          <Route component={FinanceDetails} path="/dashboard/financeDetails" />
          <Route component={ReadQuery} path="/dashboard/readQuery" />
        </Content>
      </Layout>
    </Layout> 
    )
  }
}
 
export default Dashboard