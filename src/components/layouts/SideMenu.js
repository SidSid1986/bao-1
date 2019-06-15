import React from 'react'
import { Menu, Layout } from 'antd'

const { Sider } = Layout

const menu = [
  { key: 'readOrder', val: '阅读下单' },
  { key: 'batchOrder', val: '批量下单' },
  { key: 'readQuery', val: '阅读查询' },
  { key: 'financeDetails', val: '资金明细' },
  { key: 'loginLog', val: '登录日志' },
  { key: 'accountRecharge', val: '账户充值' },
  { key: 'contactService', val: '联系客服' },
]

const SideMenu = () => {
  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <Menu theme="dark" mode="inline" defaultSelectedKeys={[menu[0].key]}>
        {
          menu.map(e => {
            const { key, val } =e
            return (
              <Menu.Item className="Item" key={key}>
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