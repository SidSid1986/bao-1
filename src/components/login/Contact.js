import React from 'react'
import { inject } from 'mobx-react'
import { Popconfirm } from 'antd'

import { clipboardHandler } from '../../utils/clipboard'

import './contact.css'

const Contact = ({ service, global, size = 26 }) => {

  if (!service || typeof service !== 'object') return null

  const { getGlobalConfig } = global

  const contactItems = service.map(e => {
    const { icon, content } = e
    return (
      <Popconfirm
        key={icon}
        title={content}
        okText="复制"
        cancelText="刷新"
        onConfirm={() => { clipboardHandler(content) }}
        onCancel={getGlobalConfig}
      >
        <img
          src={`/images/${icon}.png`}
          alt={icon}
          title={icon}
          width={size}
        />
      </Popconfirm>
    )
  })

  return (
    <div className="simulationA">
      {contactItems}
    </div>
  )
}

export default inject('global')(Contact)