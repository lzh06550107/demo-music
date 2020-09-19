import axios from './config'

export function getHotKey() {
  const url = '/search/hot'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function search(key, pageno, pagesize, type) {
  const url = '/search'

  return axios.get(url, {
    params: {
      key: key,
      pageNo: pageno,
      pageSize: pagesize,
      t: type
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
