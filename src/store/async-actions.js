import * as actions from './actions'
import { playMode } from 'common/js/config'
import { shuffle } from 'common/js/util'

export function getAdd(val) {
  return dispatch => {
    setTimeout(() => {
      dispatch(actions.setAdd(val))
    }, 1000)
  }
}

export function getRemove(val) {
  return dispatch => {
    setTimeout(() => {
      dispatch(actions.setRemove(val))
    }, 1000)
  }
}

export function getCheng(val) {
  return dispatch => {
    setTimeout(() => {
      dispatch(actions.setCheng(val))
    }, 1000)
  }
}

export function getChu(val) {
  return dispatch => {
    setTimeout(() => {
      dispatch(actions.setChu(val))
    }, 1000)
  }
}

function findIndex(list, song) {
  return list.findIndex(item => {
    return item.id === song.id
  })
}

// 歌手列表选中某一首歌后选择播放
export function getSelectSong(list, index) {
  return (dispatch, getState) => {
    dispatch(actions.setSequenceList(list))

    if (getState().player.mode === playMode.random) {
      let randomList = shuffle(list)
      dispatch(actions.setPlaylist(randomList))
      index = findIndex(randomList, list[index])
    } else {
      dispatch(actions.setPlaylist(list))
    }

    dispatch(actions.setCurrentIndex(index))
    dispatch(actions.setCurrentSong(index))
    dispatch(actions.setFullScreen(true))
    dispatch(actions.setPlayState(true))
  }
}

export function getRandomPlay(list) {
  return dispatch => {
    dispatch(actions.setPlayMode(playMode.random))
    dispatch(actions.setSequenceList(list))
    let randomList = shuffle(list)
    dispatch(actions.setPlaylist(randomList))
    dispatch(actions.setCurrentIndex(0))
    dispatch(actions.setCurrentSong(0))
    dispatch(actions.setFullScreen(true))
    dispatch(actions.setPlayState(true))
  }
}
