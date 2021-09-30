import axios from 'axios'
import { push } from 'connected-react-router'
import { _sleep } from 'function/common'
import { hideLoadingAction, showLoadingAction } from 'reducks/loading/actions'
import { setNotificationAction } from 'reducks/notification/actions'
import { fetchMemosAction, deleteMemosAction, createMemosAction, updateMemosAction } from './actions'

require('dotenv').config()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'REACT_APP_BASE_URL'

let notificationContent = {}

// メモを削除
export const deleteMemo = (id) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('メモを削除しています...'))
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/memos/' + String(id)

    await axios
      .delete(apiUrl, {
        headers: {
          'access-token': localStorage.getItem('access_token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
        },
      })
      .then((response) => {
        const data = response.data.data
        dispatch(deleteMemosAction(data))
        dispatch(push('/users/' + id))
        notificationContent = {
          variant: 'success',
          message: 'メモを削除しました',
        }
      })
      .catch((error) => {
        console.log('error', error)
        notificationContent = {
          variant: 'error',
          message: '削除に失敗しました',
        }
      })
    await _sleep(1000)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}

// memos全体を取得する
export const fetchMemos = () => {
  return async (dispatch) => {
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/memos'

    await axios
      .get(apiUrl, {
        headers: {
          'access-token': localStorage.getItem('access_token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
        },
      })
      .then((response) => {
        const data = response.data.data
        dispatch(fetchMemosAction(data))
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
}

// posts全体を取得、初回レンダー時のみ使用
export const initialFetchMemos = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction('メモ情報を取得中...'))
    dispatch(fetchMemos())
    await _sleep(1000)
    dispatch(hideLoadingAction())
  }
}

// メモを新規登録
export const createMemo = (uid, title, subject, category, contentEnglish, contentJapanese, tips) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('メモを登録中...'))

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/memos'
    const memoData = {
      user_id: uid,
      title: title,
      category: category,
      subject: subject,
      content_en: contentEnglish,
      content_ja: contentJapanese,
      tips: tips,
    }

    await axios
      .post(apiUrl, memoData, {
        headers: {
          'access-token': localStorage.getItem('auth_token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
        },
      })
      .then((response) => {
        const data = response.data.data
        dispatch(createMemosAction(data))
        dispatch(push('/users/' + uid))
        dispatch(push('/posts/list'))
        notificationContent = {
          variant: 'success',
          message: 'メモを作成しました',
        }
      })
      .catch((error) => {
        console.log('error', error)
        notificationContent = {
          variant: 'error',
          message: '作成に失敗しました',
        }
      })
    await _sleep(2500)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}

// メモを更新
export const updateMemo = (uid, id, title, subject, category, contentEnglish, contentJapanese, tips) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('メモを更新中...'))

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/memos/' + String(id)
    const updateData = {
      user_id: uid,
      id: id,
      title: title,
      category: category,
      subject: subject,
      content_en: contentEnglish,
      content_ja: contentJapanese,
      tips: tips,
    }

    await axios
      .patch(apiUrl, updateData, {
        headers: {
          'access-token': localStorage.getItem('access_token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
        },
      })
      .then((response) => {
        const data = response.data.data
        dispatch(updateMemosAction(data))
        dispatch(push('/users/' + uid))
        notificationContent = {
          variant: 'success',
          message: 'メモを更新しました',
        }
      })
      .catch((error) => {
        console.log('error', error)
        notificationContent = {
          variant: 'error',
          message: '更新に失敗しました',
        }
      })

    await _sleep(2500)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}
