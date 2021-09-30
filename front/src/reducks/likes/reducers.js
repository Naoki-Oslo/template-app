import * as Actions from './actions'
import { initialState } from 'reducks/store/initialState'

export const LikesReducer = (state = initialState.likes, action) => {
  switch (action.type) {
    case Actions.FETCH_LIKES:
      return {
        ...state,
        list: action.payload,
      }
    case Actions.CREATE_LIKES:
      return {
        ...state,
        list: action.payload,
      }
    case Actions.DELETE_LIKES:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}
