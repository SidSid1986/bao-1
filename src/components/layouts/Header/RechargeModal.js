import React, { useState } from 'react'
import { Modal, Form, Input, message, Spin } from 'antd'
import { inject } from 'mobx-react'

import CurrentBalance from './CurrentBalance'

import fetch from '../../../plugins/axios'
import { amountFixed } from '../../../utils/numFixed'

const RechargeModal = ({ visible, onCancel, form, global }) => {
  const [loading, setLoading] = useState(false)

  const { getFieldDecorator, validateFields, resetFields } = form
  const { setBalance } = global

  const onSubmit = () => {
    validateFields(async (err, values) => {
      if (!err) { 
        setLoading(true)
        try {
          const { data } = await fetch('FKCZM', values)
          const rechargeAmount = amountFixed(data[0])
          const newBalance = amountFixed(data[3])
          message.success(`恭喜您已成功充值${rechargeAmount},当前最新余额为${newBalance}`)
          setBalance(newBalance)
        } catch (error) {
          console.log(error)
        } finally {
          setLoading(false)
          resetFields()
        }
      }
    })
  }

  return (
    <Modal
      title="充值"
      visible={visible}
      onOk={onSubmit}
      onCancel={() => onCancel && onCancel(false)}
      confirmLoading={loading}
    >
      <Spin spinning={loading}>
        
        <CurrentBalance loadingHandler={setLoading} />

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
      </Spin>
    </Modal>
  )
}

export default inject('global')(Form.create({ name: 'recharge_modal' })(RechargeModal))