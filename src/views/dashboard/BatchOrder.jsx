import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { Alert, Form, Input, Button, Icon, Modal } from 'antd'

import fetch from '../../plugins/axios'
import { numFixed, amountFixed } from '../../utils/numFixed'

const { TextArea  } = Input

const TipsPrice = ({ priceConfig, getPriceAndNotice }) => {
  const modelSpan = priceConfig.map(e => {
    const { on_off, title, exchange } = e
    return on_off 
        ?
        <span key={title} style={{ marginRight: 10 }}>{title}：{exchange} / 千次</span>
        : 
        <span key={title} className="red--text">不可下单</span>
  })

  return (
    <div style={{ marginTop: 30 }}>
      <span style={{ marginRight: 10 }}>
        当前订单价格  
      </span>
      {modelSpan}
      <Button style={{ marginLeft: 10 }} onClick={getPriceAndNotice}>
        <span>刷新</span>
        <Icon type='sync' />
      </Button>
    </div>
  )
}

@inject('global')
@observer
class BatchOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {
      total: 0
    }
    this.dataReg = /^(http|https):\/\/.*----\d*----[123]$/
  }

  componentDidMount() {
    this.props.global.getPriceAndNotice()
  }

  orderValidator = ({ field }, val, callback) => {
    const valArr = val && val.replace(/\n/g, ';').split(';')
    if (valArr.length && valArr.some(e => !this.dataReg.test(e))) {
      return callback('批量下载数据不符合格式规范，请重试~')
    }
    callback()
  }

  computedPrice = async () => {
    const { validateFields, getFieldValue, setFields } = this.props.form
    validateFields(err => {
      if (!err) {
        const data = getFieldValue('data')
        if (!data) {
          return setFields({ data: { value: '', errors: [new Error('请输入批量下载数据~')] } })
        }
        const dataFormat = data.replace(/\n/g, ';').split(';')
        const { priceConfig } = this.props.global
        let total = 0
        dataFormat.forEach(e => {
          const splitData = e.split('----')
          if (splitData.length === 3) {
            const { exchange } = priceConfig.find(e => +e.key === +splitData[2])
            total += (+splitData[1] * +exchange) / 1000
          }
        })
        this.setState({ total: numFixed(total, 4) })
      }
    })
  }

  onSubmit = e => {
    e.preventDefault()
    const { validateFields, resetFields } = this.props.form
    validateFields(async (err, values) => {
      if (!err) {
        const data = values.data.replace(/\n/g, ';').split(';').map(e => e.split('----'))
        let bz, md, yd
        const { priceConfig } = this.props.global
        priceConfig.forEach(e => {
          const { key, price } = e
          switch(key) {
            case 1:
              bz = price
              break
            case 2:
              md = price
              break
            case 3:
              yd = price
              break
            default:
              break
          }
        })
        
        try {
          const { change, new: balance, old } = await fetch('FKBatAddTask', { data, bz, md, yd })
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
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { total } = this.state
    const { priceConfig, getPriceAndNotice } = this.props.global

    return (
      <div>
        <Alert
          message={(
            <div>
              <div>批量按照格式导入，即可完成批量下单格式为：链接----阅读量----模式（----为四个减号）</div>
              <div>例如：https://mp.weixin.qq.com/s/N3kUmcjK-dR4Lu7y2w2vEQ----3000----1</div>
              <div>即常规模式刷3000，一行一个，每次支持100个（常规模式=1，秒单模式=2，夜单模式=3</div>
            </div>
          )}     
          type="warning"   
        />
        
        <TipsPrice priceConfig={priceConfig} getPriceAndNotice={getPriceAndNotice} />

        <Form style={{ margin: '30px 0' }} onSubmit={this.onSubmit}>
          <Form.Item>
            {
              getFieldDecorator('data', {
                initialValue: '',
                rules: [
                  { required: true, message: '请输入批量下载数据~' },
                  { validator: this.orderValidator }
                ]
              })(
                <TextArea rows={10} />
              )
            }
          </Form.Item>

          <Form.Item>
            <Button onClick={this.computedPrice}>预算价格</Button>
            <span style={{ marginLeft: 20 }}>本单价格：{total}</span>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </div>
    )
  }
}

export default Form.create('batch_form')(BatchOrder)