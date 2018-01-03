import * as types from './action-types'
import * as states from './states'

// 加减 reducer
export function addRemoveCounter(state = states.initAddRemove, action) {
  switch (action.type) {
    case types.SET_ADD:
      return state + action.payload
    case types.SET_REMOVE:
      return state - action.payload
    default:
      return state
  }
}

// 乘除 reducer
export function chengChuCounter(state = states.initChengChu, action) {
  switch (action.type) {
    case types.SET_CHENG:
      return state * action.payload
    case types.SET_CHU:
      return state / action.payload
    default:
      return state
  }
}

// 歌手详情页面，歌手选中
export function selectSinger(state = states.initSinger, action) {
  switch (action.type) {
    case types.SET_SINGER:
      return action.payload
    default:
      return state
  }
}
