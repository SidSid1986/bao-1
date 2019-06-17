import React, { Component } from 'react'
import { Table, Form, Button } from 'antd'

class LoginLog extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tableData: []
    }
  }
  render() {
    return (
      <Table></Table>
    )
  }
}

export default LoginLog