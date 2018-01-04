import * as types from './action-types'

// 加减
export function setAdd(val = 3) {
  return { type: types.SET_ADD, payload: val }
}

export function setRemove(val = 3) {
  return { type: types.SET_REMOVE, payload: val }
}

// 乘除
export function setCheng(val = 3) {
  return { type: types.SET_CHENG, payload: val }
}

export function setChu(val = 3) {
  return { type: types.SET_CHU, payload: val }
}

export function setSinger(singer) {
  return { type: types.SET_SINGER, payload: singer }
}

// 播放器

export const setPlayState = flag => ({ type: types.SET_PLAYING_STATE, payload: flag })

export const setFullScreen = flag => ({ type: types.SET_FULL_SCREEN, payload: flag })

export const setPlaylist = data => ({ type: types.SET_PLAYLIST, payload: data })

export const setSequenceList = data => ({ type: types.SET_SEQUENCE_LIST, payload: data })

export const setPlayMode = flag => ({ type: types.SET_PLAY_MODE, payload: flag })

export const setCurrentIndex = index => ({ type: types.SET_CURRENT_INDEX, payload: index })

export const setCurrentSong = index => ({ type: types.SET_CURRENT_SONG, payload: index })
