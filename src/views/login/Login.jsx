import React, { Component } from 'react'
import Particles from 'reactparticles.js'
import { Form, Input, Button, Icon } from 'antd'
import fetch from '../../plugins/axios'

import ContactIcon from '../../components/login/ContactIcon'

import './login.css'

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field])
}

function renderContact(contact) {
  return Object.keys(contact).map(e => ContactIcon({ type: e, content: contact[e], color: '#1890ff' }))
}

class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      contact: {
        qq: '',
        wechat: ''
      },
      idx: '',
      pic: '',
      loading: false
    }
    this.getContactWay = this.getContactWay.bind(this)
  }

  componentDidMount() {
    this.props.form.validateFields()
    this.getContactWay()
  }

  onSubmit = e => {
    e.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true })
        try {
          // testbbb dede123
          const { idx } = this.state
          const { yzm } = values
          const {
            prkey,
            user,
            token
          } = await fetch('Login', { ...values, yzm: { yzm, idx } })

          sessionStorage.setItem('prkey', prkey)
          sessionStorage.setItem('user', user)
          sessionStorage.setItem('token', token)

          const { history: { push } } = this.props
          push('/dashboard/readOrder')
        } catch (error) {
          this.setState({ loading: false })
          console.log(error)
        }
      }
    })
  }

  async getContactWay() {
    try {
      const {
        QQ,
        WX,
        servertime,
        yzm: { idx, pic } 
      } = await fetch('GetQQWX', {})
      sessionStorage.setItem('system_time', servertime)
      this.setState({
        contact: {
          qq: QQ,
          wechat: WX
        },
        idx,
        pic
      })
    } catch (error) {
      console.log(error)
    }
  }


  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    const usernameError = isFieldTouched('user') && getFieldError('user')
    const passwordError = isFieldTouched('pwd') && getFieldError('password')

    const { contact, loading, pic } = this.state
    const Contact = renderContact(contact)

    return (
      <div className="login">
        <Particles id="your-component-particles" />

        <div className="loginForm">
          <Form onSubmit={this.onSubmit}>
            <Form.Item label="账号" validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
              {getFieldDecorator('user', {
                rules: [{ required: true, message: '请输入账号!' }],
              })(
                <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              )}
            </Form.Item>

            <Form.Item label="密码" validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
              {getFieldDecorator('pwd', {
                rules: [{ required: true, message: '请输入密码!' }],
              })(
                <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" />
              )}
            </Form.Item>

            { pic ? <img src={`data:image/jpg;base64,${pic}`} alt="验证码" title="验证码" /> : null }

            <Form.Item label="验证码" validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
              {getFieldDecorator('yzm', {
                rules: [{ required: true, message: '请输入验证码!' }],
              })(
                <Input prefix={<Icon type="security-scan" style={{ color: 'rgba(0,0,0,.25)' }} />} />
              )}
            </Form.Item>

            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                loading={loading}
                disabled={hasErrors(getFieldsError())}
              >
                登录
              </Button>
            </Form.Item>
          </Form>

          {Contact}
        </div>
      </div>
    )
  }
}
 
export default Form.create({ name: 'login' })(Login)