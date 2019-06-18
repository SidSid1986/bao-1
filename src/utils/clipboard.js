import { message } from 'antd'

export const clipboardHandler = (content, callback) => {
  /**
   * @author Cyan
   * @param {any} content 需要复制的内容
   * @param {function | undefined} callback 复制成功后需要进行的回调
   * @description 复制功能函数
   */

  /** 创建一个空的 div */
  const ele = document.createElement('div')
  /** 添加复制内容 */
  ele.append(content)
  /** 设置其 css 属性使其隐藏 */
  ele.style.cssText = 'position: fixed; left: -100%; top: -100%;'
  /** 将元素添加到 dom 节点中 */
  document.body.appendChild(ele)

  /** 创建选中区域函数 并选中所创建的复制文本 dom */
  const range = document.createRange()
  range.selectNode(ele)

  /** 清除 window 所选中的区域 添加复制文本 dom 到选中区域 */
  window.getSelection().removeAllRanges()
  window.getSelection().addRange(range)

  /** 判断系统是否支持复制功能 执行复制 */
  try {
    document.execCommand('copy')
    message.success('复制成功~')
  } catch (error) {
    message.success('您的浏览器不支持复制功能,请手动复制~')
    console.log(error)
  } finally {
    /** 删除复制文本 dom */
    document.body.removeChild(ele)

    /** 回调 */
    callback && callback()
  }
}