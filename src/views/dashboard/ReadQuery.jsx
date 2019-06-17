import React, { Component } from 'react'
import { Table, Form, Input, Button } from 'antd'
import moment from 'moment'

import SelectForm from '../../components/form/SelectForm'
import fetch from '../../plugins/axios'

const tableColumne = [
  { title: '账号', align: 'center', dataIndex: 'account' },
  { title: '登录时间', align: 'center', dataIndex: 'login_time' },
  { title: '登录IP', align: 'center', dataIndex: 'login_ip' }
]

const selectTypeConfig = [
  { key: -1, val: '无' },
  { key: 1, val: '标准模式' },
  { key: 2, val: '秒单模式' },
  { key: 3, val: '夜单模式' }
]

const selectOrderConfig = [
  { key: 1, val: '下单时间从小到大' },
  { key: 2, val: '下单时间从大到小' },
  { key: 3, val: '刷单数量从小到大' },
  { key: 4, val: '刷单数量从大到小' },
  { key: 5, val: '刷单数量从小到大' },
  { key: 6, val: '刷单数量从大到小' },
  { key: 7, val: '刷单总价从小到大' },
  { key: 8, val: '刷单总价从大到小' },
]

class ReadQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      loading: false,
      pagination: {
        current: 0,
        pageSize: 20,
        hideOnSinglePage: true
      }
    }
  }

  onChange = ({ current }) => {
    this.onSubmit('', current)
  }

  onSubmit = (e, page = 0) => {
    e && e.preventDefault()

    const { validateFields } = this.props.form
    validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true })
        try {
          const { data, max, page: current } = await fetch('FKSelectLogin', { ...values, page })
          console.log(data)
          // const formatData = data.map((e, index) => {
          //   const account = `${e[0]}(${e[1]})`
          //   const login_time = moment(e[2] * 1000).format('YYYY-MM-DD hh:mm:ss') || '-'
          //   const login_ip = e[3]
          //   return { account, login_time, login_ip, index }
          // })
          // this.setState(state => {
          //   state.tableData = formatData
          //   state.pagination = {
          //     ...state.pagination,
          //     current,
          //     total: max * formatData.length,
          //     pageSize: formatData.length
          //   }
          //   return state
          // })
        } catch (error) {
          console.log(error)
        } finally {
          this.setState({ loading: false })
        }
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const { loading, tableData, pagination } = this.state

    return (
      <>
        <Form layout="inline" onSubmit={this.onSubmit}>
          <Form.Item label="链接或标题">
            {
              getFieldDecorator('url', {
                rules: [{ required: true, message: '请填入链接或标题~' }]
              })(
                <Input />
              )
            }
          </Form.Item>

          <SelectForm
            model="type"
            label="类型"
            config={selectTypeConfig}
            getFieldDecorator={getFieldDecorator}
          />

          <SelectForm
            model="order"
            label="排序方式"
            config={selectOrderConfig}
            getFieldDecorator={getFieldDecorator}
          />

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>查询</Button>
          </Form.Item>
        </Form>

        <Table
          dataSource={tableData}
          pagination={pagination}
          loading={loading}
          columns={tableColumne}
          rowKey="index"
          size="small"
          style={{ background: '#fff' }}
          onChange={this.onChange}
        />
      </>
    )
  }
}

export default Form.create({ name: 'read_query' })(ReadQuery)