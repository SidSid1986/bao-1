import React, { Component } from 'react'
import { Table, Form, Input, Button, DatePicker } from 'antd'

import fetch from '../../plugins/axios'
import { timeStamp, timeParser } from '../../utils/timeTransform'

const { RangePicker } = DatePicker

const tableColumne = [
  { title: '账号', align: 'center', dataIndex: 'account' },
  { title: '昵称', align: 'center', dataIndex: 'nickname' },
  { title: '登陆时间', align: 'center', dataIndex: 'login_time' },
  { title: '登陆IP', align: 'center', dataIndex: 'login_ip' },
  { title: '登陆地点', align: 'center', dataIndex: 'login_address' },
]

class LoginLog extends Component {
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
          const { ip, timeRange } = values
          const { data, max, page: current } = await fetch('FKSelectLogin', {
            ip,
            start: timeStamp(timeRange[0]),
            end: timeStamp(timeRange[1]),
            page
          })
          const formatData = data.map((e, index) => {
            const account = e[0]
            const nickname = e[1]
            const login_time = timeParser(e[2])
            const login_ip = e[3]
            const login_address = e[4]
            return { account, nickname, login_time, login_ip, index, login_address }
          })
          this.setState(state => {
            state.tableData = formatData
            state.pagination = {
              ...state.pagination,
              current,
              total: max * formatData.length,
              pageSize: formatData.length
            }
            return state
          })
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
          <Form.Item label="IP地址">
            {getFieldDecorator('ip', { initialValue: '' })(<Input />)}
          </Form.Item>

          <Form.Item label="登陆时间">
            {
              getFieldDecorator('timeRange', { initialValue: [] })(
                <RangePicker showTime format="YYYY-MM-DD HH:mm:ss" />
              )
            }
          </Form.Item>

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

export default Form.create({ name: 'login_log' })(LoginLog)