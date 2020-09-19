import axios from './config'

export function getTopList() {
  const url = '/top/category'

  return axios.get(url, {
    params: {
      showDetail: 0
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getMusicList(topid) {
  const url = '/top'

  return axios.get(url, {
    params: {
      id: topid,
      pageSize: 100
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
