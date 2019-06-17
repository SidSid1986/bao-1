import React, { Component } from 'react'
import { Icon, Spin } from 'antd'
import { inject, observer } from 'mobx-react'

@inject('global')
@observer
class CurrentBalance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
    this.store = this.props.global
  }

  componentDidMount() {
    this.refreshBalance()
  }

  refreshBalance = async () => {
    const { balance, getBalance } = this.store
    if (balance > 0) return
    this.setState({ loading: true })
    await getBalance()
    this.setState({ loading: false })
  }

  render() {
    const { loading } = this.state
    const { balance, getBalance } = this.store

    return (
      <Spin spinning={loading}>
        <span style={{ marginRight: 10 }}>当前余额：{balance}</span>
        <Icon type="sync" onClick={() => { getBalance() }} />
      </Spin>
    )
  }
}

export default CurrentBalance