// 它接收 state 作为 第一个参数
export const singer = state => state.singer

export const playing = state => state.playing

export const fullScreen = state => state.fullScreen

export const playlist = state => state.playlist

export const sequenceList = state => state.sequenceList

export const mode = state => state.mode

export const currentIndex = state => state.currentIndex

export const currentSong = (state) => {
  return state.playlist[state.currentIndex] || {}
}

export const disc = state => state.disc

// 排行榜
export const topList = state => state.topList

// 搜索历史
export const searchHistory = state => state.searchHistory

// 获取最近播放历史
export const playHistory = state => state.playHistory

// 获取最喜欢歌曲
export const favoriteList = state => state.favoriteList
