import * as Actions from './actions'
import { initialState } from 'reducks/store/initialState'

// 第一引数にstate, 第二引数にactionがreturnした値
export const CurrentUserReducer = (state = initialState.currentUser, action) => {
  switch (action.type) {
    case Actions.EDIT_USER_PROFILE:
      return {
        ...state,
        ...action.payload,
      }
    case Actions.SIGN_IN:
      return {
        ...state, // storeの初期状態
        ...action.payload, // action.payloadで指定された値を書き換え(storeの状態を上書きする)
      }
    case Actions.SIGN_OUT:
      return {
        ...action.payload,
      }
    default:
      return state
  }
}
