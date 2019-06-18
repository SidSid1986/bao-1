import React, { Component } from 'react'
import { Table, Form, Input, Button, DatePicker, Popconfirm, Icon } from 'antd'

import SelectForm from '../../components/form/SelectForm'

import fetch from '../../plugins/axios'
import { timeParser, timeStamp } from '../../utils/timeTransform'
import { readQueryStatusParser } from '../../utils/tableParse'
import { clipboardHandler } from '../../utils/clipboard'

const tableColumne = [
  { title: '文章地址', align: 'center', dataIndex: 'url', render: url => (
    <Popconfirm title={'是否需要复制该文章地址'} icon={<Icon type="bulb" />} onConfirm={() => { clipboardHandler(url) }}>
      <span className="simulationA">{url}</span>
    </Popconfirm>
  ) },
  { title: '标题', align: 'center', dataIndex: 'title' },
  { title: '创建时间', align: 'center', dataIndex: 'create_time' },
  { title: '结束时间', align: 'center', dataIndex: 'end_time' },
  { title: '数量', align: 'center', dataIndex: 'count' },
  { title: '开始数量', align: 'center', dataIndex: 'start_count' },
  { title: '已刷数量', align: 'center', dataIndex: 'finish_count' },
  { title: '结束数量', align: 'center', dataIndex: 'end_count' },
  { title: '订单类型', align: 'center', dataIndex: 'type' },
  { title: '订单总价', align: 'center', dataIndex: 'total' },
  { title: '订单状态', align: 'center', dataIndex: 'status', render: status => readQueryStatusParser(+status) },
]

const selectTypeConfig = [
  { key: 0, val: '无' },
  { key: 1, val: '标准模式' },
  { key: 2, val: '秒单模式' },
  { key: 3, val: '夜单模式' }
]

const selectOrderConfig = [
  { key: 1, val: '下单时间从小到大' },
  { key: 2, val: '下单时间从大到小' },
  { key: 3, val: '刷单数量从小到大' },
  { key: 4, val: '刷单数量从大到小' },
  { key: 5, val: '刷单总计从小到大' },
  { key: 6, val: '刷单总计从大到小' },
  { key: 7, val: '刷单状态从小到大' },
  { key: 8, val: '刷单状态从大到小' }
]

class ReadQuery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: [],
      loading: false,
      pagination: {
        current: 1,
        pageSize: 20,
        hideOnSinglePage: true
      }
    }
  }

  onChange = ({ current }) => {
    this.onSubmit('', current)
  }

  onSubmit = (e, page = 1) => {
    e && e.preventDefault()

    const { validateFields } = this.props.form
    validateFields(async (err, values) => {
      if (!err) {
        this.setState({ loading: true })
        try {
          const { start, end } = values
          const { data, max, page: current } = await fetch('FKSelectTask', {
            ...values,
            start: timeStamp(start),
            end: timeStamp(end),
            page
          })
          const formatData = data.map((e, index) => {
            const url = e[0]
            const title = e[1]
            const create_time = timeParser(e[2] * 1000)
            const end_time = timeParser(e[3] * 1000)
            const count = e[4]
            const start_count = e[5]
            const finish_count = e[6]
            const end_count = e[7]
            const type = e[8]
            const total = e[9]
            const status = e[10]
            return {
              url,
              title,
              create_time,
              end_time,
              count,
              start_count,
              finish_count,
              end_count,
              type,
              total,
              status,
              index
            }
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
          <Form.Item label="链接或标题">
            {getFieldDecorator('url', { initialValue: '' })(<Input />)}
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
            {getFieldDecorator('start')(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
          </Form.Item>

          <Form.Item>
            {getFieldDecorator('end')(<DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />)}
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

export default Form.create({ name: 'read_query' })(ReadQuery)