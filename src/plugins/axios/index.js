import { fetch } from './axios'
import md5 from 'md5'

const formatFetch = (url, params) => {
  /**
   * @author Cyan
   * @param {String} url 请求地址
   * @param {Object} params 请求参数
   * @constant {String} data 对参数进行16进制转码
   * @constant {TimeStamp} time 当前最新时间戳
   * @constant {String} key 对所有提交参数的 val 进行 md5 加密
   * @var {String} valStr 整合所有提交参数 val 的字符
   * 
   */

  /** 参数类型判断 */
  if (typeof params !== 'object') return Promise.reject('参数格式错误~')

  /** 参数转码 */
  const data = JSON.stringify(params).split('').map(e => e.charCodeAt().toString(16)).join('')

  /** 最新时间戳 */
  const time = Date.parse(new Date()) / 1000

  /** 整合参数 val */
  let valStr = url
  Object.values({ user: 'null', data, token: 'null', key: 'null', time }).forEach(e => {
    valStr += e
  })

  /** 对整合参数加密 */
  const key = md5(valStr)

  return fetch.get(`/${url}?user=null&data=${data}&token=null&key=${key}&time=${time}`)
}

export default (url, params) => formatFetch(url, params)