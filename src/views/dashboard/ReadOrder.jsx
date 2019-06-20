import React, { Component } from 'react'
import { inject } from 'mobx-react'
import { Spin, Form, Input, InputNumber, Select, Button, Row, Col, Icon, Modal, Alert, message } from 'antd'

import fetch from '../../plugins/axios'
import { numFixed, amountFixed } from '../../utils/numFixed'

const { Option } = Select

const modelConfig = [
  { key: 1, val: '标准', on_off: 1, minOrder: 0, maxOrder: 0, price: 0, exchange: 0, info: '' },
  { key: 2, val: '秒单', on_off: 1, minOrder: 0, maxOrder: 0, price: 0, exchange: 0, info: '' },
  { key: 3, val: '夜单', on_off: 1, minOrder: 0, maxOrder: 0, price: 0, exchange: 0, info: '' }
]

const OptionItems = model => model.map(e => {
  const { key, val } = e
  return <Option key={key} value={key} >{ val }</Option>
})

const labelCol = {
  span: 4
}

const wrapperCol = {
  span: 14
}

const readCountValid = valid => {
  const { value, min, max, callback } = valid
  if (isNaN(+value)) return callback('请输入正确的阅读量~')
  if (+value < +min || +value > +max) return callback('不在可下单范围,请重试~')
  callback()
}

@inject('global')
class Read extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      model: 0,
      count: 0
    }
    this.throttle = 0
    this.throttleTimer = null
  }

  componentDidMount() {
    this.getNewestPrice()
  }

  componentWillUpdate(nextProps, nextState) {
    if ('model' in nextState && nextState.model === this.state.model) {
      return false
    }
    return true
  }

  handlerChange = (key, val) => {
    this.setState({ [key]: val })
  }

  onSubmit = e => {
    e.preventDefault()
    const { validateFields, resetFields } = this.props.form
    validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true })
        const { price } = modelConfig[this.state.model]
        try {
          const { code, change, new: balance, old } = await fetch('FKAddTask', { ...values, price })
          if (code === 200) {
            const { setBalance } = this.props.global
            setBalance(balance)
            resetFields()
            Modal.success({
              title: '操作成功~',
              content: (
                <div style={{ marginTop: 30 }}>
                  <p>下单前余额：{amountFixed(old)}</p>
                  <p>订单花费：{amountFixed(change)}</p>
                  <p>当前余额：{amountFixed(balance)}</p>
                </div>
              )
            })
          }
        } catch (error) {
          console.log(error)
        } finally {
          this.setState({ loading: false })
        }
      }
    });
  }

  getNewestPrice = async () => {
    if (this.throttle < 3) {
      this.throttle = this.throttle + 1
      if (!this.throttleTimer) {
        this.throttleTimer = setTimeout(() => {
          this.throttle = 0
          this.throttleTimer = null
        }, 10000)
      }

      this.setState({ loading: true })
      try {
        const { data, notice } = await fetch('FKGetPrice', {})
        this.props.global.setNotice(notice.map(e => e[0]))
        data.forEach((e, i) => {
          if (+modelConfig[i].key === +e[0]) {
            modelConfig[i].on_off = +e[1]
            modelConfig[i].minOrder = e[2]
            modelConfig[i].maxOrder = e[3]
            modelConfig[i].price = e[4]
            modelConfig[i].exchange = amountFixed(e[4])
            modelConfig[i].info = e[5]
          }
        })
        message.success('已获取最新信息~')
      } catch (error) {
        console.log(error)
      } finally {
        this.setState({ model: 0, loading: false })
      }
    } else {
      message.info('请勿频繁刷新~')
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { count, model, loading } = this.state
    const currentModel = modelConfig[model]
    const { info, minOrder, maxOrder, exchange, on_off } = currentModel

    return (
      <Spin spinning={loading}>
        <Form onSubmit={this.onSubmit} labelCol={labelCol} wrapperCol={wrapperCol}>
          <Form.Item label="文章链接">
            {
              getFieldDecorator('url', {
                rules: [{ required: true, message: '请输入文章链接~' }]
              })(
                <Input placeholder="请输入文章链接" allowClear />
              )
            }
          </Form.Item>

          <Form.Item label="模式">
            {
              getFieldDecorator('model', {
                initialValue: 1, rules: [{ required: true, message: '请选择模式~' }]
              })(
                <Select dropdownMatchSelectWidth={false} onSelect={e => this.handlerChange('model', e - 1)}>
                  {OptionItems(modelConfig)}
                </Select>
              )
            }
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4, span: 14 }}>
            <Alert message={info} type="warning" />
          </Form.Item>

          <Form.Item label="阅读量">
            <Row gutter={24}>
              <Col span={6}>
                {
                  getFieldDecorator('count', {
                    rules: [
                      { required: true, message: '请输入阅读量~' },
                      { validator: (field, value, callback) => { readCountValid({ value, callback, max: maxOrder, min: minOrder }) } }
                    ]
                  })(
                    <InputNumber
                      placeholder="阅读量"
                      style={{ width: '100%' }}
                      min={+minOrder}
                      max={+maxOrder}
                      onChange={e => this.handlerChange('count', e)}
                      disabled={!on_off}
                    />
                  )
                }
              </Col>
              {
                on_off ? <Col span={18}>下单限制：{minOrder} - {maxOrder}</Col> : <Col span={18} className="red--text">暂停收单</Col>
              }
            </Row>
              
          </Form.Item>

          <Form.Item label="订单价格">
            <Row gutter={24}>
              <Col span={6}>
                <Input value={numFixed((exchange * count) / 1000, 4)} disabled />
              </Col>
              {
                on_off ? 
                <Col span={18}>
                  <span style={{ marginRight: 10 }}>当前单价：{exchange} / 千次</span>
                  <Icon type="sync" onClick={this.getNewestPrice} />
                </Col>
                : <Col span={18} className="red--text">不可下单</Col>
              }
            </Row>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Spin>
    )
  }
}

export default Form.create({ name: 'query-form' })(Read)