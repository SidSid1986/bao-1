import axios from 'axios';

/** axios 请求基本配置 */
const fetch = axios.create({
  withCredentials: true
});

// axios拦截器
fetch.interceptors.request.use(
  config => config,
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截器
fetch.interceptors.response.use(
  response => {
    const { code, msg } = response.data
    if (code !== 200) {
      return Promise.reject(msg)
    }
    return response.data;
  },
  err => {
    return Promise.reject(err);
  }
);

export { fetch, axios };
