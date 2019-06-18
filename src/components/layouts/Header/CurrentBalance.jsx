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
    this.refreshBalance()
  }

  refreshBalance = async () => {
    const { loadingHandler } = this.props
    const { getBalance } = this.store

    loadingHandler(true)
    try {
      await getBalance()
    } catch (error) {
      console.log(error)
    } finally {
      loadingHandler(false)
    }
  }

  render() {
    const { balance, getBalance } = this.store

    return (
      <div>
        <span style={{ marginRight: 10 }}>当前余额：{balance}</span>
        <Icon type="sync" onClick={() => { getBalance() }} />
      </div>
    )
  }
}

export default CurrentBalance