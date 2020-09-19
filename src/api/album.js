import axios from './config'

export function getAlbumImageUrl(albummId) {
  const url = '/album'
  axios.get(url, {
    params: {
      albummid: albummId
    }
  }).then((res) => {
    return Promise.resolve(res.data.picUrl)
  })
}
