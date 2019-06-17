import React from 'react'
import { Form, Select } from 'antd'
const { Option } = Select

const createOption = config => {
  return config.map(e => {
    const { val, key } = e
    return <Option key={key} value={key}>{val}</Option>
  })
}

const SelectForm = ({ model, label, config, getFieldDecorator }) => {
  return (
    <Form.Item label={label}>
      {
        getFieldDecorator(model, {
          initialValue: config[0].key,
          rules: [{ required: true, message: `请选择${label}~` }]
        })(
          <Select dropdownMatchSelectWidth={false}>
            {createOption(config)}
          </Select>
        )
      }
    </Form.Item>
  )
}

export default SelectForm