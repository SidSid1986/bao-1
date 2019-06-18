import { observable, action } from 'mobx'
import { message } from 'antd'

import fetch from '../plugins/axios'
import { amountFixed } from '../utils/numFixed'

let throttle = 0, throttleTimer = null

class Store {
  @observable balance = null

  @action
  getBalance = async () => {
    if (throttle < 3) {
      throttle = throttle + 1

      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          throttle = 0
        }, 10000)
      }

      try {
        const { data } = await fetch('FKGetSelf', {})
        this.balance = amountFixed(data[0][1])
      } catch (error) {
        console.log(error)
      }
    } else {
      message.info('请勿频繁刷新~')
    }
  }

  @action
  setBalance = balance => this.balance = amountFixed(balance)
}

export default Store