import axios from 'axios'
import { fetchLikesAction, createLikesAction, deleteLikesAction } from './actions'

require('dotenv').config()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'REACT_APP_BASE_URL'

// categories全体を取得する
export const fetchLikes = () => {
  return async (dispatch) => {
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/likes'

    await axios
      .get(apiUrl, {
        headers: {
          'access-token': localStorage.getItem('access_token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
        },
      })
      .then((response) => {
        const list = response.data.data
        dispatch(fetchLikesAction(list))
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
}

// category全体を取得、初回レンダー時のみ使用
export const initialFetchLikes = () => {
  return async (dispatch) => {
    dispatch(fetchLikes())
  }
}

// いいね！を付ける
export const createLikes = (post_id, user_id) => {
  return async (dispatch) => {
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/likes'
    const data = {
      user_id: user_id,
      post_id: post_id,
    }

    await axios
      .post(apiUrl, data)
      .then((response) => {
        const data = response.data.data
        dispatch(createLikesAction(data))
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
}

// いいね！を取り消す
export const deleteLikes = (check) => {
  return async (dispatch) => {
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/likes/' + String(check.id)
    const like = {
      user_id: check.user_id,
      post_id: check.post_id,
    }

    await axios
      .delete(apiUrl, like, {
        headers: {
          'access-token': localStorage.getItem('auth_token'),
          client: localStorage.getItem('client'),
          uid: localStorage.getItem('uid'),
        },
      })
      .then((response) => {
        const data = response.data.data
        dispatch(deleteLikesAction(data))
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
}
