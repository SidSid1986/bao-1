import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Menu, Layout, Icon } from 'antd'

const { Sider } = Layout

const menu = [
  { key: 'readOrder', val: '阅读下单', icon: 'read' },
  { key: 'batchOrder', val: '批量下单', icon: 'cluster' },
  { key: 'readQuery', val: '阅读查询', icon: 'file-search' },
  { key: 'financeDetails', val: '资金明细', icon: 'dollar' },
  { key: 'loginLog', val: '登陆日志', icon: 'solution' }
]

const SideMenu = props => {
  const {
    history: { push },
    location: { pathname }
  } = props

  const pathParser = pathname.split('/')[2]

  const [openKeys, setOpenKeys] = useState(pathParser || menu[0].key)

  const onClick = ({ key }) => {

    if (!pathname.includes(key)) push(key)
    setOpenKeys(key)
  }

  return (
    <Sider breakpoint="lg" collapsedWidth="0">
      <Menu
        theme="dark"
        mode="inline"
        onClick={onClick}
        selectedKeys={[openKeys]}
      >
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
 
export default withRouter(SideMenu)