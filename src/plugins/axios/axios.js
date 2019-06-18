import axios from 'axios'
import { Modal } from 'antd'

const infoModal = Modal.info

/** axios 请求基本配置 */
const fetch = axios.create({
  withCredentials: true
})

// axios拦截器
fetch.interceptors.request.use(
  config => config,
  err => {
    return Promise.reject(err)
  }
)

// 响应拦截器
fetch.interceptors.response.use(
  response => {
    const { code, msg } = response.data
    if (code === 200) {
      return response.data
    }

    if (code === 3) {
      infoModal({
        title: '提示',
        content: msg,
        onOk: () => {
          sessionStorage.clear()
          window.location.replace('/')
        }
      })
      return Promise.reject(msg)
    }
    
    infoModal({
      title: '提示',
      content: msg
    })
    return Promise.reject(msg)
  },
  err => {
    return Promise.reject(err)
  }
)

export { fetch, axios }
