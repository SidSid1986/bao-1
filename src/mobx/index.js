import { observable, action } from 'mobx'
import { message } from 'antd'

import fetch from '../plugins/axios'
import { storage } from '../utils/storage'
import { amountFixed } from '../utils/numFixed'

let balanceC = 0
let balanceT = null
let configC = 0
let configT = null

class Store {
  @observable balance = storage.get('balance') || 0
  @observable globalConfig = {
    service: storage.get('service') || [],
    pic: ''
  }
  @observable notice = []

  @action
  getBalance = async (tip = true) => {
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
    return false
  }

  @action
  getGlobalConfig = async (tip = false) => {
    if (configC < 8) {
      configC = configC + 1
      if (!configT) {
        configT = setTimeout(() => {
          configC = 0
          configT = null
        }, 10000)
      }
      
      try {
        const { QQ, WX, servertime, yzm: { idx, pic } } = await fetch('GetQQWX', {})
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

        /** 客户时间 */
        const clientTime = new Date().getTime() / 1000
        /** 时间差 */
        const offsetTime = servertime - clientTime
      
        storage.set({ offsetTime })
        tip && message.success('客服刷新成功~')
      } catch (error) {
        console.log(error)
      }
    } else {
      message.info('请勿频繁刷新~')
    }
    return false
  }

  @action
  setBalance = balance => {
    this.balance = amountFixed(balance) 
    storage.set({ balance: this.balance })
  }

  @action
  setNotice = notice => this.notice = notice
}

export default Store