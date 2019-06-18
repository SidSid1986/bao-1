import React, { Component } from 'react'
import { Table, Form, Input, Button, DatePicker } from 'antd'
import moment from 'moment'

import SelectForm from '../../components/form/SelectForm'

import fetch from '../../plugins/axios'
import { amountFixed } from '../../utils/numFixed'
import { timeParser, timeStamp } from '../../utils/timeTransform'
import { readQueryStatusParser } from '../../utils/tableParse'

const { RangePicker } = DatePicker

const startTime = moment().startOf('day')
const endTime = moment().endOf('day')

const tableColumne = [
  { title: '文章地址', align: 'center', dataIndex: 'url', render: url => (
    <span className="simulationA" onClick={() => window.open(url)}>{url}</span>
  ) },
  { title: '标题', align: 'center', dataIndex: 'title' },
  { title: '创建时间', align: 'center', dataIndex: 'create_time' },
  { title: '结束时间', align: 'center', dataIndex: 'end_time' },
  { title: '数量', align: 'center', dataIndex: 'count' },
  { title: '开始数量', align: 'center', dataIndex: 'start_count' },
  { title: '已刷数量', align: 'center', dataIndex: 'finish_count' },
  { title: '结束数量', align: 'center', dataIndex: 'end_count' },
  { title: '订单类型', align: 'center', dataIndex: 'type', render: type => selectTypeConfig.find(e => e.key === +type).val || '未知' },
  { title: '订单总价', align: 'center', dataIndex: 'total', render: total => amountFixed(total) },
  { title: '订单状态', align: 'center', dataIndex: 'status', render: status => readQueryStatusParser(+status) },
]

const selectTypeConfig = [
  { key: 0, val: '无' },
  { key: 1, val: '标准' },
  { key: 2, val: '秒单' },
  { key: 3, val: '夜单' }
]

const selectOrderConfig = [
  { key: 1, val: '下单时间从大到小' },
  { key: 2, val: '下单时间从小到大' },
  { key: 3, val: '刷单数量从大到小' },
  { key: 4, val: '刷单数量从小到大' },
  { key: 5, val: '刷单总计从大到小' },
  { key: 6, val: '刷单总计从小到大' },
  { key: 7, val: '刷单状态从大到小' },
  { key: 8, val: '刷单状态从小到大' }
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
          const { timeRange } = values
          const { data, max, page: current } = await fetch('FKSelectTask', {
            ...values,
            start: timeStamp(timeRange[0]),
            end: timeStamp(timeRange[1]),
            page
          })
          const formatData = data.map((e, index) => {
            const url = e[0]
            const title = e[1]
            const create_time = timeParser(e[2])
            const end_time = timeParser(e[3])
            const count = e[4]
            const start_count = +e[5] || '-'
            const finish_count = +e[6] || '-'
            const end_count = +e[7] || '-'
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
        <Form layout="inline" onSubmit={this.onSubmit} >
          <Form.Item label="链接或标题">
            {getFieldDecorator('url', { initialValue: '' })(<Input allowClear />)}
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

          <Form.Item label="创建时间">
            {
              getFieldDecorator('timeRange', { initialValue: [startTime, endTime] })(
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

export default Form.create({ name: 'read_query' })(ReadQuery)