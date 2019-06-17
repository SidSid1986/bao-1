import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN'

// import App from './App'
import AppRouter from './components/appRouter/AppRouter'
import * as serviceWorker from './serviceWorker'
import Store from './mobx'

import './index.css'
import 'antd/dist/antd.css'

const global = new Store()

ReactDOM.render(
  <LocaleProvider locale={zhCN}>
    <Provider global={global}>
      <AppRouter />
    </Provider>
  </LocaleProvider>, 
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
