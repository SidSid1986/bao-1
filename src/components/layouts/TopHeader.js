import React, { useState } from 'react'
import { Layout, Avatar, Dropdown, Icon, Modal, Spin } from 'antd'
import { inject } from 'mobx-react'

import DropMenu from './Header/DropMenu'
import RechargeModal from './Header/RechargeModal'
import CurrentBalance from './Header/CurrentBalance'
import Contact from '../login/Contact'
import RollNotice from './Header/RollNotice'

import fetch from '../../plugins/axios'
import { storage } from '../../utils/storage'

import './header.css'

const { Header } = Layout

const logoutModal = () => {
  Modal.confirm({
    title: '是否确认退出',
    onOk: async () => {
      try {
        const { code } = await fetch('LoginOut', {})
        if (code === 200) {
          sessionStorage.clear()
          window.location.href = '/'
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
}

const TopHeader = ({ global }) => {
  const [rechargeModalVisible, setRechargeModalVisible] = useState(false)
  const [loading, setLoading] = useState(false)
  
  const { globalConfig: { service } } = global
  const nickname = storage.get('userInfo') && storage.get('userInfo').nickname
  
  const dropMenu = [
    { key: 'recharge', val: '充值', icon: 'dollar', callback: () => { setRechargeModalVisible(true) } },
    { key: 'logout', val: '安全退出', icon: 'logout', callback: () => { logoutModal() } }
  ]

  return (
    <Header style={{ background: '#fff' }} id="header">
      <Spin spinning={loading}>
        <div className="header-container">
          <RollNotice />

          <div className="header-content">
            <Contact service={service} pure />

            <CurrentBalance margin loadingHandler={setLoading} />

            <Dropdown overlay={DropMenu(dropMenu)} getPopupContainer={() => document.querySelector('#header')}>
              <div className="simulationA">
                <Avatar shape="square" src="/images/avatar.jpg" />
                <span className="mH-20">{nickname}</span>
                <Icon type="down" />
              </div>
            </Dropdown>
          </div>
        </div>
      </Spin>

      <RechargeModal visible={rechargeModalVisible} onCancel={setRechargeModalVisible} />
    </Header>
  )
}

export default inject('global')(TopHeader)