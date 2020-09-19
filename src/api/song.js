import axios from './config'

export function getLyric(mid) {
  const url = '/lyric'

  return axios.get(url, {
    params: {
      songmid: mid
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSong(songMId) {
  const url = '/song/urls'

  return axios.get(url, {
    params: {
      id: songMId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
