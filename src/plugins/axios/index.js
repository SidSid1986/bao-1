import md5 from 'md5'

import { fetch } from './axios'
import hex from '../hex'
import { storage } from '../../utils/storage'

const { hexString } = hex

const formatFetch = (url, params) => {
  /**
   * @author Cyan
   * @param {String} url 请求地址
   * @param {Object} params 请求参数
   * @constant {String} data 对参数进行16进制转码
   * @constant {TimeStamp} time 当前最新时间戳
   * @constant {String} key 对所有提交参数的 val 进行 md5 加密
   * @var {String} valStr 整合所有提交参数 val 的字符
   */

  /** 参数类型判断 */
  if (typeof params !== 'object') return Promise.reject('参数格式错误~')

  /** 参数转码 */
  const data = hexString(JSON.stringify(params))

  /** 最新时间戳 */
  const time = Date.parse(new Date()) / 1000

  /** 整合参数 val */
  let valStr = url, md5Params = {}
  if (url === 'GetQQWX' || !storage.get('userInfo')) {
    md5Params = { user: 'null', data, token: 'null', key: 'null', time }
  } else {
    const { account, key, token } = storage.get('userInfo')
    md5Params = { user: account, data, token, key, time }
  }

  Object.values(md5Params).forEach(e => {
    valStr += e
  })

  md5Params.key = md5(valStr)

  const queryUrl = Object.keys(md5Params).map(e => `${e}=${md5Params[e]}`).join('&')

  return fetch.get(`/${url}?${queryUrl}`)
}

export default (url, params) => formatFetch(url, params)