import React, { useState } from 'react'
import { Modal, Form, Input, message, Spin, Button, Icon, Row, Col } from 'antd'
import { inject } from 'mobx-react'

import CurrentBalance from './CurrentBalance'
import Contact from '../../login/Contact'

import fetch from '../../../plugins/axios'
import { amountFixed } from '../../../utils/numFixed'

const RechargeModal = ({ visible, onCancel, form, global }) => {
  const [loading, setLoading] = useState(false)

  const { getFieldDecorator, validateFields, resetFields } = form
  const { setBalance, globalConfig: { service }, getGlobalConfig } = global

  const onSubmit = () => {
    validateFields(async (err, values) => {
      if (!err) { 
        setLoading(true)
        try {
          const { data } = await fetch('FKCZM', values)
          const rechargeAmount = amountFixed(data[0])
          const newBalance = data[3]
          message.success(`恭喜您已成功充值${rechargeAmount},当前最新余额为${amountFixed(newBalance)}`)
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

  const refreshContact = async () => {
    setLoading(true)
    try {
      await getGlobalConfig()
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
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

        <Row type="flex" align="middle">
          <Col>
            <Contact service={service} />
          </Col>

          <Col>
            <Button onClick={refreshContact} size="small" style={{ margin: '20px 0' }}>
              <span>刷新</span>
              <Icon type="sync" />
            </Button>
          </Col>
        </Row>

        <div className="red--text">如果联系不到，请刷新客服信息查看是否已更改联系方式</div>
      </Spin>
    </Modal>
  )
}

export default inject('global')(Form.create({ name: 'recharge_modal' })(RechargeModal))