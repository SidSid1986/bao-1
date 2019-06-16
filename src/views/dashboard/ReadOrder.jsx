import React, { Component } from 'react'
import { Form, Input, InputNumber, Select, Button } from 'antd'
import fetch from '../../plugins/axios'

const { Option } = Select

const model = [
  { key: 1, val: '标准' },
  { key: 2, val: '秒单' },
  { key: 3, val: '夜单' }
]

const OptionItems = () => model.map(e => {
  const { key, val } = e
  return <Option key={key} value={key} >{ val }</Option>
})

class Read extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false
    }
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true })
        try {
          const { code } = await fetch('FKAddTask', { ...values, price: 1 })
          console.log(code)
        } catch (error) {
          console.log(error)
        } finally {
          this.setState({ loading: false })
        }
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form

    return (
      <>
        <Form layout="inline" onSubmit={this.onSubmit}>
          <Form.Item>
            {
              getFieldDecorator('url', {
                rules: [{ required: true, message: '请输入文章链接~' }]
              })(
                <Input placeholder="请输入文章链接" />
              )
            }
          </Form.Item>

          <Form.Item>
            {
              getFieldDecorator('count', {
                rules: [
                  { required: true, message: '请输入阅读量~' }
                ]
              })(
                <InputNumber placeholder="阅读量" />
              )
            }
          </Form.Item>

          <Form.Item>
            {
              getFieldDecorator('model', {
                initialValue: 1,
                rules: [{ required: true, message: '请选择模式~' }]
              })(
                <Select>
                  {OptionItems()}
                </Select>
              )
            }
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </>
    )
  }
}

export default Form.create({ name: 'query-form' })(Read)