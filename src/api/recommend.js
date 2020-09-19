import axios from './config'

export function getRecommend() {
  const url = '/recommend/banner'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getDiscList() {
  const url = '/recommend/playlist/u'

  return axios.get(url).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSongList(disstid) {
  const url = '/songlist'

  return axios.get(url, {
    params: {
      id: disstid
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
