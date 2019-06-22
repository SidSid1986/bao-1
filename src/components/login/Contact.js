import React from 'react'
import { inject } from 'mobx-react'
import { Popconfirm } from 'antd'

import { clipboardHandler } from '../../utils/clipboard'

const containerStyle = {
  display: 'flex'
}

const itemStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  marginRight: 10
}

const Contact = ({ service, global, size = 26, pure = false }) => {

  if (!service || typeof service !== 'object') return null

  const { getGlobalConfig } = global

  const contactItems = service.map(e => {
    const { icon, content } = e

    const contactContent = !pure && <span>{content}</span>
    return (
      <Popconfirm
        key={icon}
        title={content}
        okText="复制"
        cancelText="刷新"
        onConfirm={() => { clipboardHandler(content) }}
        onCancel={getGlobalConfig}
      >
        <div style={itemStyle}>
          <img
            src={`/images/${icon}.png`}
            alt={icon}
            title={icon}
            width={size}
          />
          {contactContent}
        </div>
      </Popconfirm>
    )
  })

  return (
    <div className="simulationA" style={containerStyle}>
      {contactItems}
    </div>
  )
}

export default inject('global')(Contact)