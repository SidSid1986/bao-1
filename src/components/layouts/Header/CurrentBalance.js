import React, { useState, useEffect } from 'react'
import { Icon, Spin, message } from 'antd'

import fetch from '../../../plugins/axios'
import numFixed from '../../../utils/numFixed'

const CurrentBalance = ({ forthwith }) => {
  const [balance, setBalance] = useState('')
  const [loading, setLoading] = useState(false)
  const [throttle, setThrottle] = useState(0)

  let throttleTimer = null

  const getUserBalance = async () => {
    if (throttle < 3) {
      setThrottle(throttle + 1)
      setLoading(true)

      if (!throttleTimer) {
        throttleTimer = setTimeout(() => {
          setThrottle(0)
        }, 10000)
      }

      try {
        const { data } = await fetch('FKGetSelf', {})
        setBalance(numFixed(data[0][1] / 10000, 4) || 0)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    } else {
      message.info('请勿频繁刷新~')
    }
  }

  useEffect((a) => {
    console.log(a)
    // if (forthwith) getUserBalance()
  })

  return (
    <Spin spinning={loading}>
      <span style={{ marginRight: 10 }}>当前余额：{balance}</span>
      <Icon type="sync" onClick={() => { getUserBalance() }} />
    </Spin>
  )
}

export default CurrentBalance