import React, { useState } from 'react'
import { Layout, Row, Col, Avatar, Dropdown, Icon, Modal } from 'antd'

import DropMenu from './Header/DropMenu'
import RechargeModal from './Header/RechargeModal'
import CurrentBalance from './Header/CurrentBalance'

const { Header } = Layout
const user = sessionStorage.getItem('user')

const logoutModal = () => {
  return Modal.confirm({
    title: '是否确认退出',
    onOk: async () => {
      
    }
  })
}

const TopHeader = () => {
  const [rechargeModalVisible, setRechargeModalVisible] = useState(false)
  
  const dropMenu = [
    { key: 'recharge', val: '充值', icon: 'dollar', callback: () => { setRechargeModalVisible(true) } },
    { key: 'logout', val: '退出登录', icon: 'logout', callback: () => { logoutModal() } }
  ]

  return (
    <Header style={{ background: '#fff' }} id="header">
      <Row type="flex" justify="end" align="middle">
        <Col>
          <CurrentBalance/>
        </Col>

        <Col offset={1}>
          <Dropdown overlay={DropMenu(dropMenu)} getPopupContainer={() => document.querySelector('#header')} className="header-drop">
            <div className="simulationA">
              <Avatar shape="square" icon="user" />
              <span style={{ margin: '0 15px' }}>{user}</span>
              <Icon type="down" />
            </div>
          </Dropdown>
        </Col>
      </Row>

      <RechargeModal visible={rechargeModalVisible} onCancel={setRechargeModalVisible} />
    </Header>
  )
}

export default TopHeader