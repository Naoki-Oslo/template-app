import axios from 'axios'
import { fetchCategoriesAction } from './actions'

axios.defaults.headers.post['Access-Control-Allow-Origin'] = process.env.REACT_APP_BASE_URL

// categories全体を取得する
export const fetchCategories = () => {
  return async (dispatch) => {
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/categories'

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
        dispatch(fetchCategoriesAction(list))
      })
      .catch((error) => {
        console.log('error', error)
      })
  }
}

// category全体を取得、初回レンダー時のみ使用
export const initialFetchCategories = () => {
  return async (dispatch) => {
    dispatch(fetchCategories())
  }
}
