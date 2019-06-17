export const readQueryStatusParser = status => {
  switch (status) {
    case 0:
      return '待确认'
    case 1:
      return '已确认,请等待'
    case 2:
      return '执行中'
    case 3:
      return '已完成'
    case 10:
      return '已撤单'
    case 11:
      return '已退单'
    case 12:
      return '撤单中'
    default:
      return '未知'
  }
}