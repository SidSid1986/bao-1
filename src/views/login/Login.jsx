import React, { Component } from 'react'
import Particles from 'reactparticles.js'
import { Form, Input, Button, Icon, Spin } from 'antd'
import { inject, observer } from 'mobx-react'

// import ContactIcon from '../../components/login/ContactIcon'
import Contact from '../../components/login/Contact'

import fetch from '../../plugins/axios'
import { storage } from '../../utils/storage'

import './login.css'

const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

const form = Comp => Form.create({ name: 'login' })(Comp)

@inject('global')
@observer
@form
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      codeLoading: false
    }
    this.store = this.props.global
  }

  componentDidMount() {
    this.props.form.validateFields()
    this.getValidCode()
  }

  onSubmit = e => {
    e.preventDefault()
    const { validateFields, setFieldsValue } = this.props.form
    validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true })
        try {
          // testbbb dede123
          const idx = storage.get('idx')
          const { yzm } = values
          const {
            prkey,
            user,
            token,
            nickname,
            point,
            sf
          } = await fetch('Login', { ...values, yzm: { yzm, idx } })

          storage.set({
            userInfo: {
              account: user,
              nickname,
              key: prkey,
              token,
              balance: point,
              role: sf
            }
          })

          const { history: { push }, global: { setBalance } } = this.props
          setBalance(point)
          push('/dashboard/readOrder')
        } catch (error) {
          setFieldsValue({ yzm: '', pwd: '' })
          this.setState({ loading: false })
          this.getValidCode()
          console.log(error)
        }
      }
    })
  }

  getValidCode = async () => {
    this.setState({ codeLoading: true })
    try {
      const { getGlobalConfig } = this.store
      await getGlobalConfig()
    } catch (error) {
      console.log(error)
    } finally {
      this.setState({ codeLoading: false })
    }
  }

  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form

    const usernameError = isFieldTouched('user') && getFieldError('user')
    const passwordError = isFieldTouched('pwd') && getFieldError('password')

    const { loading, codeLoading } = this.state
    const { globalConfig: { service, code } } = this.store

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

            <Spin spinning={codeLoading}>
              {code && <img
                src={`data:image/jpg;base64,${code}`}
                alt="验证码"
                title="验证码"
                onClick={this.getValidCode}
              />}
            </Spin>

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
                登陆
              </Button>
            </Form.Item>
          </Form>

          <Contact service={service} />

        </div>
      </div>
    )
  }
}
 
export default Login