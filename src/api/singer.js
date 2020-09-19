import axios from './config'

export async function getSingerList() {
  const url = '/singer/list'

  const letters = ['-100', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

  let singerList = {}

  for (let i = 0; i < letters.length; i++) {
    let result = await axios.get(url, {
      params: {
        index: i === 0 ? -100 : i
      }
    })
    singerList[letters[i]] = result.data.data.list
  }
  return singerList
}

export function getSingerDetail(singerId) {
  const url = '/singer/desc'

  return axios.get(url, {
    params: {
      singermid: singerId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function getSingerSongs(singerId) {
  const url = '/singer/songs'

  return axios.get(url, {
    params: {
      singermid: singerId
    }
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

