import React from 'react'
import { Modal, Form, Input } from 'antd'

import CurrentBalance from './CurrentBalance'

const RechargeModal = Form.create({ name: 'recharge_modal' })(
  ({ form, visible, onCancel }) => {

    const { getFieldDecorator } = form

    const onSubmit = () => {
      form.validateFields((err, values) => {
        console.log(values)
      })
    }

    return (
      <Modal
        title="充值"
        visible={visible}
        onOk={onSubmit}
        onCancel={() => { onCancel && onCancel(false) }}
      >
        <CurrentBalance forthwith />
        <Form>
          <Form.Item>
            {
              getFieldDecorator('code')(
                <Input />
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    )
  }
)

export default RechargeModal