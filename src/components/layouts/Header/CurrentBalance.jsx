import React, { Component } from 'react'
import { Icon } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('global')
@observer
class CurrentBalance extends Component {
  constructor(props) {
    super(props)
    this.store = this.props.global
  }

  componentDidMount() {
    const { balance } = this.store
    if (!balance) this.refreshBalance()
  }

  refreshBalance = async () => {
    const { loadingHandler } = this.props
    const { getBalance } = this.store

    try {
      loadingHandler(true)
      await getBalance()
    } catch (error) {
      console.log(error)
    } finally {
      loadingHandler(false)
    }
  }

  render() {
    const { balance } = this.store
    const { margin } = this.props

    return (
      <div className={margin && 'mH-20'}>
        <span style={{ marginRight: 10 }}>当前余额：{balance}</span>
        <Icon type="sync" onClick={this.refreshBalance} />
      </div>
    )
  }
}

export default CurrentBalance