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
export function singer(state = states.initSinger, action) {
  switch (action.type) {
    case types.SET_SINGER:
      return action.payload
    default:
      return state
  }
}

// playing: false,
// fullScreen: false,
// playList: [],
// sequenceList: [],
// mode: playMode.sequence,
// currentIndex: -1
export function player(state = states.initPlayer, action) {
  const { type, payload } = action
  switch (type) {
    case types.SET_PLAYING_STATE:
      return {
        ...state,
        playing: payload
      }
    case types.SET_FULL_SCREEN:
      return {
        ...state,
        fullScreen: payload
      }
    case types.SET_PLAYLIST:
      return {
        ...state,
        playList: payload
      }
    case types.SET_SEQUENCE_LIST:
      return {
        ...state,
        sequenceList: payload
      }
    case types.SET_PLAY_MODE:
      return {
        ...state,
        mode: payload
      }
    case types.SET_CURRENT_INDEX:
      return {
        ...state,
        mode: payload
      }
    case types.SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: state.playList.find((v, i) => i === state.currentIndex)
      }
    default:
      return state
  }
}
