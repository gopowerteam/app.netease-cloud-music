export default {
  server: process.env.REACT_APP_SERVER, // 后端服务地址
  debug: process.env.NODE_ENV === 'development',
  timeout: process.env.REACT_APP_TIMEOUT
}
