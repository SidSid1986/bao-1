const set = (keyVal, time = 24 * 60 * 60) => {
  if (typeof keyVal !== 'object') return '参数格式错误~'

  try {
    Object.keys(keyVal).forEach(e => {
      sessionStorage.setItem(
        e,
        JSON.stringify({
          exp: (time || this.time) * 1000 + new Date().getTime(),
          val: keyVal[e]
        })
      );
    });
  } catch (error) {
    console.log(error)
  }
}

const get = (key) => {
  const valParse = sessionStorage.getItem(key) && JSON.parse(sessionStorage.getItem(key));
  if (!valParse) {
    return null;
  }

  const { exp, val } = valParse;
  const nowDate = new Date().getTime();

  if (nowDate > exp) {
    this.removeItem(key);
    return null;
  }

  return val;
}

export const storage = { set, get }