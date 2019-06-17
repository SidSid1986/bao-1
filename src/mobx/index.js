import { observable, action } from 'mobx'

import fetch from '../plugins/axios'
import numFixed from '../utils/numFixed'

class Store {
  @observable balance = 0

  @action
  refreshUserInfo = async () => {
    try {
      const { data } = await fetch('FKGetSelf', {})
      this.balance = numFixed(data[0][1] / 10000, 4) || 0
    } catch (error) {
      console.log(error)
    }
  }
}

export default Store