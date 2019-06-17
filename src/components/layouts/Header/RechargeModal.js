import React, { useState } from 'react'
import { Modal, Form, Input, message } from 'antd'

import CurrentBalance from './CurrentBalance'

import fetch from '../../../plugins/axios'

const RechargeModal = Form.create({ name: 'recharge_modal' })(
  ({ form, visible, onCancel }) => {

    const { getFieldDecorator, validateFields, resetFields } = form

    const [loading, setLoading] = useState(false)

    const onSubmit = () => {
      validateFields(async (err, values) => {
        if (!err) { 
          setLoading(true)
          try {
            const { data } = await fetch('FKCZM', values)
            const rechargeAmount = data[0]
            const newBalance = data[3]
            message.success(`恭喜您已成功充值${rechargeAmount},当前最新余额为${newBalance}`)
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
        onCancel={() => { onCancel && onCancel(false) }}
        confirmLoading={loading}
      >
        <CurrentBalance />

        <Form>
          <Form.Item label="充值码">
            {
              getFieldDecorator('code', {
                rules: [{ required: true, message: '请填写充值码~' }]
              })(
                <Input.TextArea rows={4} />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
)

export default RechargeModal