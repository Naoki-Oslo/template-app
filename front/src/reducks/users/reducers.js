import * as Actions from './actions'
import { initialState } from 'reducks/store/initialState'

export const UsersReducer = (state = initialState.users, action) => {
  switch (action.type) {
    case Actions.FETCH_USERS:
      return {
        ...state,
        list: action.payload,
      }
    default:
      return state
  }
}
