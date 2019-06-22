import React, { Component } from 'react'
import { Alert, Form, Input, Button } from 'antd'

const { TextArea  } = Input

// /^(http|https):\/\/.*----\d*----[123]$/.test("https://mp.weixin.qq.com/s/N3kUmcjKdR4Lu7y2w2vEQ----3000----1")
const validator = ({  })

class BatchOrder extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  computePrice = () => {
    // const {  }
  }

  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <div>
        <Alert
          message="批量按照格式导入，即可完成批量下单
          格式为：链接----阅读量----模式（----为四个减号）
          例如：https://mp.weixin.qq.com/s/N3kUmcjK-dR4Lu7y2w2vEQ----3000----1
          即常规模式刷3000，一行一个，每次支持100个（常规模式=1，秒单模式=2，夜单模式=3"
          type="warning"        
        />

        <Form style={{ margin: '30px 0' }}>
          <Form.Item>
            {
              getFieldDecorator('FKBatAddTask', {
                rules: [
                  { required: true, message: '请输入批量下载数据~' },
                  { validator: validator }
                ]
              })(
                <TextArea rows={4} />
              )
            }
          </Form.Item>

          <Form.Item>
            <Button>预算价格</Button>
            <span style={{ marginLeft: 20 }}>本单价格：0</span>
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