import React from 'react'
import { inject } from 'mobx-react'
import { Icon } from 'antd'

import './contact.css'

const Contact = ({ service, layout = 'horizontal', refresh = false, global }) => {

  if (!service || typeof service !== 'object') return null

  const { getGlobalConfig } = global

  const contactItems = service.map(e => {
    const { icon, content } = e
    if (layout === 'horizontal') {
      return (
        <div className="contact-horizontal" key={icon}>
          <Icon type={icon} />
          <span>{content}</span>
        </div>
      )
    } 
    if (layout === 'inline') {
      return (
        <span className="contact-inline" key={icon}>
          <Icon type={icon} />
          <span>{content}</span>
        </span>
      )
    }
    return null
  })

  return (
    <div className="simulationA">
      {contactItems}
      {refresh && <Icon type='sync' onClick={getGlobalConfig} />}
    </div>
  )
}

export default inject('global')(Contact)