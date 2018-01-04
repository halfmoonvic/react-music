import { playMode } from 'common/js/config'

export const initAddRemove = 0

export const initChengChu = 1

export const initSinger = ''

export const initPlayer = {
  playing: false,
  fullScreen: false,
  playList: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1,
  currentSong: {}
}
