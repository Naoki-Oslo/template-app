import axios from 'axios'
import { _sleep } from 'function/common'
import { hideLoadingAction, showLoadingAction } from 'reducks/loading/actions'
import { fetchUsersAction } from './actions'

require('dotenv').config();
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'REACT_APP_BASE_URL';

// posts全体を取得する
export const fetchUsers = () => {
    return async (dispatch) => {
      const data = { users: [] }
      const apiUrl = process.env.REACT_APP_API_V1_URL + '/users'
  
      await axios
        .get(apiUrl, { 
          headers: {
            'access-token': localStorage.getItem('access_token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
          },
        })
        .then((response) => {
          data['users'] = response.data
        })
        .catch((error) => {
          console.log('error', error)
        })
  
      dispatch(fetchUsersAction(data))
    }
  };
  
  // posts全体を取得、初回レンダー時のみ使用
  export const initialFetchUsers = () => {
      return async (dispatch) => {
          dispatch(showLoadingAction('ユーザー情報を取得中...'))
          dispatch(fetchUsers())
          await _sleep(1000)
          dispatch(hideLoadingAction())
      }
  };