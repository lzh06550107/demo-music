import * as types from './mutation-types'
import {playMode} from 'common/js/config'
import {shuffle} from 'common/js/util'
import {saveSearch, clearSearch, deleteSearch, savePlay, saveFavorite, deleteFavorite} from 'common/js/cache'

// action方法可以异步执行，只要最后调用commit方法

// 查找当前歌曲在列表中的索引位置
function findIndex(list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}

// 选择歌曲播放，解构对象，Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
export const selectPlay = function ({commit, state}, {list, index}) {
  commit(types.SET_SEQUENCE_LIST, list) // 设置序列列表？？
  // 随机播放模式
  if (state.mode === playMode.random) {
    let randomList = shuffle(list) // 洗牌
    commit(types.SET_PLAYLIST, randomList) // 设置播放列表
    index = findIndex(randomList, list[index]) // 获取该歌曲新的索引位置
  } else { // 顺序播放模式
    commit(types.SET_PLAYLIST, list) // 设置播放列表
  }
  commit(types.SET_CURRENT_INDEX, index) // 设置当前播放歌曲索引
  commit(types.SET_FULL_SCREEN, true) // 设置全屏播放模式
  commit(types.SET_PLAYING_STATE, true) // 设置当前为播放状态
}

// 随机歌曲播放，解构对象，第一个参数来自context对象解构
export const randomPlay = function ({commit}, {list}) {
  commit(types.SET_PLAY_MODE, playMode.random) // 设置播放模式为随机模式
  commit(types.SET_SEQUENCE_LIST, list) // 设置序列列表？？
  let randomList = shuffle(list) // 洗牌
  commit(types.SET_PLAYLIST, randomList) // 设置播放列表
  commit(types.SET_CURRENT_INDEX, 0) // 设置当前播放歌曲从第一个开始
  commit(types.SET_FULL_SCREEN, true) // 设置全屏播放模式
  commit(types.SET_PLAYING_STATE, true) // 设置当前为播放状态
}

// 插入歌曲，解构对象，第一个参数来自context对象解构
export const insertSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  // 记录当前歌曲
  let currentSong = playlist[currentIndex]
  // 查找当前列表中是否有待插入的歌曲并返回其索引
  let fpIndex = findIndex(playlist, song)
  // 因为是插入歌曲，所以索引+1
  currentIndex++
  // 插入这首歌到当前索引位置
  playlist.splice(currentIndex, 0, song)
  // 如果已经包含了这首歌
  if (fpIndex > -1) {
    // 如果当前插入的序号大于列表中的序号
    if (currentIndex > fpIndex) {
      playlist.splice(fpIndex, 1)
      currentIndex--
    } else {
      playlist.splice(fpIndex + 1, 1)
    }
  }

  let currentSIndex = findIndex(sequenceList, currentSong) + 1

  let fsIndex = findIndex(sequenceList, song)

  sequenceList.splice(currentSIndex, 0, song)

  if (fsIndex > -1) {
    if (currentSIndex > fsIndex) {
      sequenceList.splice(fsIndex, 1)
    } else {
      sequenceList.splice(fsIndex + 1, 1)
    }
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)
  commit(types.SET_FULL_SCREEN, true)
  commit(types.SET_PLAYING_STATE, true)
}

// 保存搜索历史，解构对象，第一个参数来自context对象解构
export const saveSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, saveSearch(query))
}

// 删除搜索历史，解构对象，第一个参数来自context对象解构
export const deleteSearchHistory = function ({commit}, query) {
  commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
}

// 清除搜索历史，解构对象，第一个参数来自context对象解构
export const clearSearchHistory = function ({commit}) {
  commit(types.SET_SEARCH_HISTORY, clearSearch())
}

// 删除歌曲，解构对象，第一个参数来自context对象解构
export const deleteSong = function ({commit, state}, song) {
  let playlist = state.playlist.slice()
  let sequenceList = state.sequenceList.slice()
  let currentIndex = state.currentIndex
  let pIndex = findIndex(playlist, song)
  playlist.splice(pIndex, 1)
  let sIndex = findIndex(sequenceList, song)
  sequenceList.splice(sIndex, 1)
  if (currentIndex > pIndex || currentIndex === playlist.length) {
    currentIndex--
  }

  commit(types.SET_PLAYLIST, playlist)
  commit(types.SET_SEQUENCE_LIST, sequenceList)
  commit(types.SET_CURRENT_INDEX, currentIndex)

  if (!playlist.length) {
    commit(types.SET_PLAYING_STATE, false)
  } else {
    commit(types.SET_PLAYING_STATE, true)
  }
}

// 删除歌曲列表，解构对象，第一个参数来自context对象解构
export const deleteSongList = function ({commit}) {
  commit(types.SET_CURRENT_INDEX, -1)
  commit(types.SET_PLAYLIST, [])
  commit(types.SET_SEQUENCE_LIST, [])
  commit(types.SET_PLAYING_STATE, false)
}

// 保存歌曲到播放历史，解构对象，第一个参数来自context对象解构
export const savePlayHistory = function ({commit}, song) {
  commit(types.SET_PLAY_HISTORY, savePlay(song))
}

// 保存歌曲到喜欢列表，解构对象，第一个参数来自context对象解构
export const saveFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, saveFavorite(song))
}

// 删除歌曲到喜欢列表，解构对象，第一个参数来自context对象解构
export const deleteFavoriteList = function ({commit}, song) {
  commit(types.SET_FAVORITE_LIST, deleteFavorite(song))
}
