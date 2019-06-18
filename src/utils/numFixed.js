export const numFixed = (num, bit = 2) => {
  /**
   * @author Cyan
   * @param {number | string} num 源数字
   * @param {number} bit 小数保留位
   * @description 小数保留位，通过字符串形式修改，确保精度问题
   */
  
  if (isNaN(num)) {
    // 非数字返回0的小数保留位
    return Number(0).toFixed(bit);
  } else {
    if (bit > 0) {
      if (num.toString().indexOf('.') === -1) {
        // 源数字没有小数点 直接拼接需要的需要保留的小数位
        let suffix = '.';
        for (let i = 0; i < bit; i++) {
          suffix += '0';
        }
        return num + suffix;
      } else {
        // 源数字已经带有小数点 通过小数点分割数组
        const splitNum = num.toString().split('.');
        if (splitNum[1].length >= bit) {
          // 源数字小数保留已经满足要求 或者超出 直接截取到需要的位数
          return splitNum[0] + '.' + splitNum[1].slice(0, bit);
        } else {
          // 源数字小数拼接保留位与需求位相差的位数
          let suffix = '';
          for (let i = 0; i < bit - splitNum[1].length; i++) {
            suffix += '0';
          }
          return splitNum[0] + '.' + splitNum[1] + suffix;
        }
      }
    } else {
      return Math.floor(num);
    }
  }
}

export const amountFixed = amount => numFixed(amount / 10000, 4)