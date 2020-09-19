// export const commonParams = {
//   g_tk: 1928093487,
//   inCharset: 'utf-8',
//   outCharset: 'utf-8',
//   notice: 0,
//   format: 'jsonp'
// }
//
// export const options = {
//   param: 'jsonpCallback'
// }
//

// 请求的是第三方接口，不直接请求QQ音乐服务器
import axios from 'axios'

let config = {
  baseURL: 'http://192.168.0.103:3300',
  timeout: 20000
  // withCredentials: true
}

let install = axios.create(config)

export default install
