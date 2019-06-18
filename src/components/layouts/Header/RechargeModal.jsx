import React, { Component } from 'react'
import { Modal, Form, Input, message } from 'antd'
import { inject, observer } from 'mobx-react'

import CurrentBalance from './CurrentBalance'

import fetch from '../../../plugins/axios'
import { amountFixed } from '../../../utils/numFixed'

const form = Comp => Form.create({ name: 'recharge_modal' })(Comp)

@inject('global')
@observer
@form
class RechargeModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  onSubmit = () => {
    const {
      form: { validateFields, resetFields },
      global: { setBalance }
    } = this.props
    validateFields(async (err, values) => {
      if (!err) { 
        this.setState({ loading: true })
        try {
          const { data } = await fetch('FKCZM', values)
          const rechargeAmount = data[0]
          const newBalance = data[3]
          message.success(`恭喜您已成功充值${rechargeAmount},当前最新余额为${amountFixed(newBalance)}`)
          setBalance(newBalance)
        } catch (error) {
          console.log(error)
        } finally {
          this.setState({ loading: false })
          resetFields()
        }
      }
    })
  }

  render() {
    const { visible, onCancel, form: { getFieldDecorator } } = this.props
    const { loading } = this.state

    return (
      <Modal
        title="充值"
        visible={visible}
        onOk={this.onSubmit}
        onCancel={() => onCancel && onCancel(false)}
        confirmLoading={loading}
      >
        <CurrentBalance />

        <Form>
          <Form.Item label="充值码">
            {
              getFieldDecorator('code', {
                rules: [{ required: true, message: '请填写充值码~' }]
              })(
                <Input />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
}

export default RechargeModal