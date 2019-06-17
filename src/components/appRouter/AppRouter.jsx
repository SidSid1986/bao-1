import React, { PureComponent } from 'react'
import { Router, Route } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import Login from '../../views/login/Login'
import Dashboard from '../../components/layouts/Dashboard'

const history = createBrowserHistory()

export default class AppRouter extends PureComponent {
  render() {
    return (
      <Router history={history}>
        <Route component={Login} path="/" exact />
        <Route component={Dashboard} path="/dashboard" />
      </Router>
    )
  }
}