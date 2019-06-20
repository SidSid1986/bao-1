const accountValid = /^[a-zA-Z0-9]{6,20}$/

export const login = [
  {
    model: 'user',
    label: '账号',
    placeholder: '登录账号',
    prefix: 'user',
    rules: [
      { pattern: accountValid, message: '账号格式错误！' }
    ]
  },
  {
    type: 'password',
    model: 'pwd',
    label: '密码',
    placeholder: '登录密码',
    prefix: 'lock'
  },
  {
    model: 'yzm',
    label: '验证码',
    placeholder: '验证码',
    prefix: 'security-scan'
  }
]

export const register = [
  {
    model: 'user',
    label: '账号',
    placeholder: '注册账号',
    prefix: 'user',
    rules: [
      { pattern: accountValid, message: '账号格式错误，应为6-20位字母数字！' }
    ]
  },
  {
    type: 'password',
    model: 'pwd',
    label: '密码',
    placeholder: '注册密码',
    prefix: 'lock'
  },
  {
    model: 'nickname',
    label: '昵称',
    placeholder: '昵称',
    prefix: 'smile',
    rules: [
      { pattern: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,15}$/, message: '请输入2至15中文昵称~' }
    ]
  },
  {
    model: 'qq',
    label: 'QQ号',
    placeholder: 'QQ号',
    prefix: 'qq',
    rules: [
      { pattern: /^[1-9][0-9]{4,12}$/, message: 'QQ号格式检验错误~' }
    ]
  },
  {
    model: 'phone',
    label: '手机号',
    placeholder: '手机号',
    prefix: 'mobile',
    rules: [
      { pattern: /^[1]([3-9])[0-9]{9}$/, message: '手机号格式校验错误~' }
    ]
  },
  {
    model: 'yqm',
    label: '邀请码',
    placeholder: '邀请码',
    prefix: 'trademark',
    unrequired: true,
    initialValue: ''
  }
]