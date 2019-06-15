import React from 'react'
import { Icon } from 'antd'

const style = {
  display: 'flex',
  alignItems: 'center',
  lineHeight: '24px'
}

export default ({ type, content, color }) => (
  <div key={type} style={style}>
    <Icon type={type} style={{ color, marginRight: 10 }} />
    <span style={{ color }}>{content}</span>
  </div>
)