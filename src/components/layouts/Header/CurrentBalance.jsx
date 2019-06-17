import React, { Component } from 'react'
import { Icon, Spin, message } from 'antd'
import { inject } from 'mobx-react'

// import fetch from '../../../plugins/axios'
// import numFixed from '../../../utils/numFixed'

@inject('global')
class CurrentBalance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      balance: 0
    }
    this.throttleTimer = null
    this.throttle = 0
  }

  componentDidMount() {
    console.log(this.props)
    // this.getUserBalance()
  }

  // getUserBalance = async () => {
  //   if (this.throttle < 3) {
  //     this.throttle = this.throttle + 1

  //     if (!this.throttleTimer) {
  //       this.throttleTimer = setTimeout(() => {
  //         this.throttle = 0
  //       }, 10000)
  //     }

  //     try {
  //       const { data } = await fetch('FKGetSelf', {})
  //       this.setState({
  //         balance: numFixed(data[0][1] / 10000, 4) || 0
  //       })
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   } else {
  //     message.info('请勿频繁刷新~')
  //   }
  // }

  render() {
    const { loading, balance } = this.state

    return (
      <Spin spinning={loading}>
        <span style={{ marginRight: 10 }}>当前余额：{balance}</span>
        <Icon type="sync" onClick={() => {  }} />
      </Spin>
    )
  }
}

export default CurrentBalance