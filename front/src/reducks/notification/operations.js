import { _sleep } from 'function/common'
import { setNotificationAction } from './actions'

export const delaySetNotification = (variant, message, delayTime) => {
  return async (dispatch) => {
    console.log('delaySetNotification')
    await _sleep(delayTime)
    dispatch(setNotificationAction(variant, message))
  }
}
