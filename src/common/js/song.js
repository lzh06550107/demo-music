import {getLyric, getSong} from 'api/song'
import {RESULT_OK} from 'api/constant'

export default class Song {
  constructor({id, mid, singer, name, album, duration, image}) {
    this.id = id // 歌曲id
    this.mid = mid // 歌曲媒体id
    this.singer = singer // 演唱者
    this.name = name // 歌曲名称
    this.album = album // 专辑名称
    this.duration = duration // 歌曲长度
    this.image = image // 专辑图片
  }

  getLyric() {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }

    return new Promise((resolve, reject) => {
      getLyric(this.mid).then((res) => {
        if (res.result === RESULT_OK) {
          this.lyric = res.data.lyric
          console.log(this.lyric)
          resolve(this.lyric)
        } else {
          reject('no lyric')
        }
      })
    })
  }

  getSong() {
    if (this.url) {
      return Promise.resolve(this.url)
    }

    return new Promise((resolve, reject) => {
      getSong(this.mid).then((res) => {
        if (res.result === RESULT_OK && Object.keys(res.data).length > 0) {
          this.url = res.data[this.mid]
          console.log(this.url)
          resolve(this.url)
        } else {
          reject('no permission')
        }
      })
    })
  }
}

export function createSong(musicData) {
  let song = new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`
    // url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
    // url: songUrl
  })
  song.getSong().catch((res) => {
    console.log(res)
  })
  return song
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  } else if (typeof (singer) === 'string') {
    return singer
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}

