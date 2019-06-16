import React from 'react'
import { Menu, Icon } from 'antd'

const DropMenu = dropMenu => (
  <Menu>
    {
      dropMenu.map(e => {
        const { key, val, icon, callback} = e
        return (
          <Menu.Item key={key} onClick={() => { callback && callback() }} >
            <Icon type={icon} />
            <span>{val}</span>
          </Menu.Item>
        )
      })
    }
  </Menu>
)

export default DropMenu