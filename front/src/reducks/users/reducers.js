import * as Actions from './actions'
import initialState from '../store/initialState'

export const UsersReducer = (state = initialState.users, action) => {
    // 第一引数にstate, 第二引数にactionがreturnした値
    switch (action.type) {
        case Actions.SIGN_IN:
            return {
                ...state,    // storeの初期状態
                ...action.payload　　　  // action.payloadで指定された値を書き換え(storeの状態を上書きする)
            }
        case Actions.SIGN_OUT:
            return {
                ...action.payload
            }
        default:
            return state
    }
}