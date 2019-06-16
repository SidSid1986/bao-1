import React from 'react'
import { Menu, Layout, Icon } from 'antd'

const { Sider } = Layout

const menu = [
  { key: 'readOrder', val: '阅读下单', icon: 'read' },
  { key: 'batchOrder', val: '批量下单', icon: 'cluster' },
  { key: 'readQuery', val: '阅读查询', icon: 'file-search' },
  { key: 'financeDetails', val: '资金明细', icon: 'dollar' },
  { key: 'loginLog', val: '登录日志', icon: 'solution' },
  // { key: 'accountRecharge', val: '账户充值', icon: 'money-collect' }
]

const SideMenu = () => {
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[menu[0].key]}>
        {
          menu.map(e => {
            const { key, val, icon } =e
            return (
              <Menu.Item className="Item" key={key}>
                <Icon type={icon} />
                <span>{val}</span>
              </Menu.Item>
            )
          })
        }
      </Menu>
    </Sider>
  )
}
 
export default SideMenu