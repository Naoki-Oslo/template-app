import * as Actions from './actions'
import { initialState } from 'reducks/store/initialState'

export const MemosReducer = (state = initialState.memos, action) => {
  switch (action.type) {
    case Actions.DELETE_MEMO:
      return {
        ...state,
        list: action.payload,
      }
    case Actions.CREATE_MEMO:
      return {
        ...state,
        list: action.payload,
      }
    case Actions.UPDATE_MEMO:
      return {
        ...state,
        list: action.payload,
      }
    case Actions.FETCH_MEMOS:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}
