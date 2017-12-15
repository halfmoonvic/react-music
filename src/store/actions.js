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
