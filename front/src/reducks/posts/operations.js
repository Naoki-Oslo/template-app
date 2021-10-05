import axios from 'axios'
import { push } from 'connected-react-router'
import { _sleep } from 'function/common'
import { hideLoadingAction, showLoadingAction } from 'reducks/loading/actions'
import { setNotificationAction } from 'reducks/notification/actions'
import { fetchPostsAction, deletePostAction, createPostsAction, updatePostsAction } from './actions'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = process.env.REACT_APP_BASE_URL

let notificationContent = {}

// テンプレートを削除
export const deletePost = (id) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('テンプレートを削除しています...'))
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/posts' + String(id)

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
        dispatch(deletePostAction(data))
        dispatch(push('/posts/list'))
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
export const fetchPosts = (category) => {
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
        let posts = category === '' ? data : data.filter((element) => element.category === category.name)
        dispatch(fetchPostsAction(posts))
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
}

// posts全体を取得、初回レンダー時のみ使用
export const initialFetchPosts = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction('テンプレート情報を取得中...'))
    dispatch(fetchPosts())
    await _sleep(1000)
    dispatch(hideLoadingAction())
  }
}

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
        dispatch(createPostsAction(data))
        dispatch(push('/posts/list'))
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
}

// テンプレートを更新
export const updatePost = (uid, id, title, subject, category, contentEnglish, contentJapanese, tips) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('テンプレートを更新中...'))

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
        const data = response.data.data
        dispatch(updatePostsAction(data))
        dispatch(push('/posts/list'))
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
}

// コメントを新規投稿
export const createComment = (uid, id, comment) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('コメントを登録中...'))

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/comments'
    const commentData = {
      user_id: uid,
      post_id: id,
      comment: comment,
    }

    await axios
      .post(apiUrl, commentData, {
        headers: {
          'access-token': localStorage.getItem('auth_token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
        },
      })
      .then(() => {
        notificationContent = {
          variant: 'success',
          message: 'コメントを作成しました',
        }
      })
      .catch((error) => {
        console.log('error', error)
        notificationContent = {
          variant: 'error',
          message: 'コメント作成に失敗しました',
        }
      })
    await _sleep(2500)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}
