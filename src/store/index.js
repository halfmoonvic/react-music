import { combineReducers } from 'redux';
import * as reducers from './reducers'

/**
 * reducers 手动合并
 */
// export function counter(state = 1, action) {
//   return {
//     addRemoveCounter: addRemoveCounter(state.addRemoveCounter, action),
//     chengChuCounter: chengChuCounter(state.chengChuCounter, action)
//   }
// }

// redux 方法的 combineReducers 结果与上面的书写的函数是一样一样的
/**
 * 利用 redux 的 combineReducers 方法进行合并
 * 效果与上面是一样的
 */
export default combineReducers({
  // addRemoveCounter,
  // chengChuCounter
  ...reducers
})
