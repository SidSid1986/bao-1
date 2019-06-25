import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Icon } from 'antd'

import './rollNotice.css'

@inject('global')
@observer
class RollNotice extends Component {
  constructor(props) {
    super(props)
    this.frame = null
    this.total = 0
    this.move = 0
    this.offset = 0
  }

  componentDidMount() {
    window.addEventListener('resize', this.setAnimateConfig)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.setAnimateConfig)
  }

  noticeMove = () => {
    if (this.offset < -this.move) {
      this.offset = this.total
    } else {
      this.offset = this.offset - 1
    }
  
    document.querySelector('.rollNotice-content div').style.transform = `translateX(${this.offset}px)`
  
    this.frame = window.requestAnimationFrame(this.noticeMove)
  }
  
  setAnimateConfig = () => {
    this.total = document.querySelector('.rollNotice-content').clientWidth
    this.move = document.querySelector('.rollNotice-content div').clientWidth
  
    if (!this.frame) this.noticeMove()
  }

  render() {
    const { notice } = this.props.global

    const content = notice.length && notice.map((e, i) => {
      return <span key={i} style={{ marginRight: 20 }}>{i + 1}、{e}</span>
    })
    
    // setTimeout(() => {
    //   this.setAnimateConfig()
    // }, 0)

    return (
      <div className="rollNotice-container">
        <Icon type="notification" theme="filled" style={{ color: '#1890ff', marginRight: 10 }} />

        <div className="rollNotice-content">
          <div>
            {content}
          </div>
        </div>
      </div>
    )
  }
}

export default RollNotice