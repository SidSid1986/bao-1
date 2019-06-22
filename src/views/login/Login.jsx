import React, { Component } from 'react'
import { Form, Button, Modal } from 'antd'
import { inject, observer } from 'mobx-react'
import Particle from 'zhihu-particle'

import LoginForm from '../../components/login/LoginForm'
import Contact from '../../components/login/Contact'

import fetch from '../../plugins/axios'
import { storage } from '../../utils/storage'
import { login, register } from './formConfig'

// import particleConfig from './particle-config'
import './login.css'

// const hasErrors = fieldsError => Object.keys(fieldsError).some(field => fieldsError[field])

const form = Comp => Form.create({ name: 'login' })(Comp)

@form
@inject('global')
@observer
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      codeLoading: false,
      formType: 'login'
    }
    this.store = this.props.global
  }

  componentDidMount() {
    // this.props.form.validateFields()
    this.getValidCode()

    new Particle(document.getElementById('particle'), {
      interactive: true,
      density: 'low',
      atomColor: '#e6e6e6'
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const { validateFields, setFieldsValue, resetFields } = this.props.form
    validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true })
        const { formType } = this.state
        if (formType === 'login') {
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
        if (formType === 'register') {
          try {
            const { code, msg } = await fetch('Reg', values)
            if (code === 200) {
              resetFields()
              Modal.success({
                title: '提示',
                content: msg
              })
            }
          } catch (error) {
            this.setState({ loading: false })
            console.log(error)
          }
        }
      }
    })
  }

  getValidCode = async () => {
    try {
      const { getGlobalConfig } = this.store
      await getGlobalConfig()
    } catch (error) {
      console.log(error)
    }
  }

  renderForm = type => {
    const { globalConfig: { code } } = this.store

    const { form } = this.props

    const config = type === 'login' ? login : register

    const RenderForm = config.map(e => {
      const { model } = e
      let suffix = null

      const isCode = model === 'yzm' && code

      if (isCode) {
        suffix = (
          <img
            src={`data:image/jpg;base64,${code}`}
            alt="验证码"
            title="验证码"
            height="38px"
            onClick={this.getValidCode}
            style={{ cursor: 'pointer' }}
          />
        )
      }

      return (
        <LoginForm
          key={e.model}
          form={form}
          config={{ rules: [], ...e }}
          suffix={suffix}
        />
      )
    })

    const ChangeForm = type === 'login' 
    ? (
      <span>
        还没有账号？马上进行
        <span className="simulationA" onClick={() => this.onChangeType('register')}>注册</span>
      </span>
    ) : (
      <span>
        注册完成，立即
        <span className="simulationA" onClick={() => this.onChangeType('login')}>登录</span>
      </span>
    )

    return { RenderForm, ChangeForm }
  }

  onChangeType = formType => {
    const { resetFields } = this.props.form
    resetFields()
    this.setState({ formType })
  }

  render() {
    // const { getFieldsError } = this.props.form

    const { loading, formType } = this.state
    const { globalConfig: { service } } = this.store

    const { RenderForm, ChangeForm } = this.renderForm(formType)

    const submitText = formType === 'login' ? '登录' : '注册'

    return (
      <div className="login">
        <div id="particle" />

        <div className="loginForm">
          <Form onSubmit={this.onSubmit}>
            {RenderForm}

            <Form.Item>
              {ChangeForm}
            </Form.Item>

            <Form.Item>
              <Button
                block
                size="large"
                type="primary"
                htmlType="submit"
                loading={loading}
              >
                {submitText}
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