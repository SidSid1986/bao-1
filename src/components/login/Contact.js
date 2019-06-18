import React from 'react'
import { Icon } from 'antd'

import './contact.css'

const Contact = ({ service, layout = 'horizontal', refresh = false }) => {

  if (!service || typeof service !== 'object') return null

  const contactItems = service.map(e => {
    const { icon, content } = e
    if (layout === 'horizontal') {
      return (
        <div className="simulationA contact-horizontal" key={icon}>
          <Icon type={icon} />
          <span>{content}</span>
        </div>
      )
    } 
    if (layout === 'inline') {
      return (
        <span className="simulationA contact-inline" key={icon}>
          <Icon type={icon} />
          <span>{content}</span>
        </span>
      )
    }
    return null
  })

  return (
    <div>
      {contactItems}
    </div>
  )
}

export default Contact