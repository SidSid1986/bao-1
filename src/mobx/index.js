import { observable, action } from 'mobx'
import { message } from 'antd'

import fetch from '../plugins/axios'
import numFixed from '../utils/numFixed'

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
        this.balance = numFixed(data[0][1] / 10000, 4) || 0
      } catch (error) {
        console.log(error)
      }
    } else {
      message.info('请勿频繁刷新~')
    }
  }

  @action
  setBalance = balance => this.balance = numFixed(balance / 10000, 4) || 0
}

export default Store