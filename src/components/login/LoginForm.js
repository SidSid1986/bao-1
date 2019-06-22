import React from 'react'
import { Form, Input, Icon } from 'antd'

const LoginForm = ({ form, config, suffix }) => {
  const { type, model, label, placeholder, prefix, rules, unrequired, initialValue } = config
  const { getFieldDecorator } = form
  
  // const help = !isFieldsTouched() && ''

  const DirectInput = type === 'password' ? Input.Password : Input

  return (
    <Form.Item>
      {
        getFieldDecorator(model, {
          initialValue,
          rules: [
            { required: !unrequired, message: `请输入${label}~` },
            ...rules
          ]
        })(
          <DirectInput
            size="large"
            placeholder={placeholder}
            prefix={<Icon type={prefix} />}
            suffix={suffix}
          />
        )
      }
    </Form.Item>
  )
}

export default LoginForm