import { observable, action } from 'mobx'
import { message } from 'antd'

import fetch from '../plugins/axios'
import { storage } from '../utils/storage'
import { amountFixed } from '../utils/numFixed'

let throttle = {
  balanceC: 0,
  balanceT: null,
  configC: 0,
  configT: null
}

class Store {
  @observable balance = storage.get('balance') || 0
  @observable globalConfig = {
    service: storage.get('service') || [],
    pic: ''
  }

  @action
  getBalance = async (tip = true) => {
    let { balanceC, balanceT } = throttle
    if (balanceC < 3) {
      balanceC = balanceC + 1

      if (!balanceT) {
        balanceT = setTimeout(() => {
          balanceC = 0
          balanceT = null
        }, 10000)
      }

      try {
        const { data } = await fetch('FKGetSelf', {})
        this.setBalance(data[0][1])
        tip && message.success('余额刷新成功~')
      } catch (error) {
        console.log(error)
      }
    } else {
      message.info('请勿频繁刷新~')
    }
  }

  @action
  getGlobalConfig = async (tip = false) => {
    let { configC, conigT } = throttle
    if (configC < 3) {
      configC = configC + 1
      if (!conigT) {
        conigT = setTimeout(() => {
          configC = 0
          conigT = null
        }, 10000)
      }
      
      try {
        const { QQ, WX, yzm: { idx, pic } } = await fetch('GetQQWX', {})
        const service = [
          { icon: 'qq', content: QQ },
          { icon: 'wechat', content: WX },
        ]
        this.globalConfig = {
          service,
          code: pic
        }
        storage.set({ idx })
        storage.set({ service })
        tip && message.success('客服刷新成功~')
      } catch (error) {
        console.log(error)
      }
    } else {
      message.info('请勿频繁刷新~')
    }
  }

  @action
  setBalance = balance => {
    this.balance = amountFixed(balance) 
    storage.set({ balance: this.balance })
  }
}

export default Store