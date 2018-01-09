import * as actions from './actions'

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

// 歌手列表选中某一首歌后选择播放
export function getSelectSong(list, index) {
  return dispatch => {
    dispatch(actions.setPlaylist(list))
    dispatch(actions.setSequenceList(list))
    dispatch(actions.setCurrentIndex(index))
    dispatch(actions.setCurrentSong(index))
    dispatch(actions.setFullScreen(true))
    dispatch(actions.setPlayState(true))
  }
}
