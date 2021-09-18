import axios from 'axios'
import { push } from 'connected-react-router'
import { _sleep } from 'function/common'
import { hideLoadingAction, showLoadingAction } from 'reducks/loading/actions'
import { setNotificationAction } from 'reducks/notification/actions'
import { fetchPostsAction } from './actions'

require('dotenv').config();
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'REACT_APP_BASE_URL';

let notificationContent = {}

// テンプレートを削除
export const deletePost = (id) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('テンプレートを削除しています...'))
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/posts/' + String(id)

    await axios
      .delete(apiUrl, {
        headers: {
          'access-token': localStorage.getItem('access_token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
        },
      })
      .then(() => {
        dispatch(fetchPosts())
        dispatch(push('/posts/index'))
        notificationContent = {
          variant: 'success',
          message: 'テンプレートを削除しました',
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

// posts全体を取得する
export const fetchPosts = () => {
  return async (dispatch) => {
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/posts'

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
        dispatch(fetchPostsAction(data))
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
};


// posts全体を取得、初回レンダー時のみ使用
export const initialFetchPosts = () => {
    return async (dispatch) => {
        dispatch(showLoadingAction('テンプレート情報を取得中...'))
        dispatch(fetchPosts())
        await _sleep(1000)
        dispatch(hideLoadingAction())
    }
};


// テンプレートを新規登録
export const createPost = (uid, title, subject, category, contentEnglish, contentJapanese, tips) => {
  return async (dispatch) => {

    dispatch(showLoadingAction('テンプレートを登録中...'))

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/posts'
    const postData = {
        user_id: uid,
        title: title,
        category: category,
        subject: subject,
        content_en: contentEnglish,
        content_ja: contentJapanese,
        tips: tips,
    }

    await axios
        .post(apiUrl, postData, {
            headers: {
                'access-token': localStorage.getItem('auth_token'),
                client: localStorage.getItem('client'),
                uid: localStorage.getItem('uid'),
            },
        })
        .then((response) => {
            const data = response.data.data
            dispatch(fetchPostsAction(data))
            dispatch(push('/'))
            notificationContent = {
              variant: 'success',
              message: '投稿に成功しました',
            }
        })
        .catch((error) => {
            console.log('error', error)
            notificationContent = {
                variant: 'error',
                message: '投稿に失敗しました',
            }
        })
    await _sleep(2500)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
};


// テンプレートを更新
export const updatePost = (uid, id, title, subject, category, contentEnglish, contentJapanese, tips) => {
    return async (dispatch) => {
  
      dispatch(showLoadingAction('テンプレートを編集中...'))
  
      const apiUrl = process.env.REACT_APP_API_V1_URL + '/posts/' + String(id)
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
              // responseには、@posts = Post.allを受け取っている
              const data = response.data.data
              dispatch(fetchPostsAction(data))
              dispatch(push('/'))
              notificationContent = {
                variant: 'success',
                message: 'テンプレートを更新しました',
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
};
