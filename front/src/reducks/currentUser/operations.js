import axios from 'axios'
import { push, goBack } from 'connected-react-router'
import { _sleep, createRandamString, isValidEmailFormat, isValidRequiredInput } from 'function/common'
import { hideLoadingAction, showLoadingAction } from 'reducks/loading/actions'
import { setNotificationAction } from 'reducks/notification/actions'
import { signInAction, signOutAction, editProfileStateAction } from './actions'
import { initialFetchUsers } from 'reducks/users/operations'
import { initialFetchPosts } from 'reducks/posts/operations'
import { initialFetchCategories } from 'reducks/categories/operations'
import { initialFetchLikes } from 'reducks/likes/operations'

require('dotenv').config()
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'REACT_APP_BASE_URL'

let notificationContent = {}

export const listenAuthState = () => {
  return async (dispatch) => {
    // LocalStorageに認証情報が含まれている場合
    if (localStorage.getItem('access_token')) {
      const apiUrl = process.env.REACT_APP_API_V1_URL + '/auth/sessions'

      await axios
        .get(apiUrl, {
          headers: {
            'access-token': localStorage.getItem('access_token'),
            client: localStorage.getItem('client'),
            uid: localStorage.getItem('uid'),
          },
        })
        .then((response) => {
          const userData = response.data.data
          const userProfile = {
            isSignedIn: true,
            uid: userData.id,
            name: userData.name,
            email: userData.email,
            occupation: userData.occupation,
            organization: userData.organization,
            profile: userData.profile,
            image: userData.image,
            role: userData.admin,
          }
          dispatch(signInAction(userProfile))
          dispatch(initialFetchUsers())
          dispatch(initialFetchPosts())
          dispatch(initialFetchCategories())
          dispatch(initialFetchLikes())
        })
        .catch(() => {
          dispatch(setNotificationAction('error', 'ログインに失敗しました。'))
        })
      // LocalStorageに認証情報が含まれていない場合
    } else {
      dispatch(setNotificationAction('error', '認証情報が見つかりません。'))
      dispatch(push('/signin'))
    }
  }
}

export const signUp = (name, occupation, organization, email, password, confirmPassword) => {
  return async (dispatch) => {
    // Validations
    if (!isValidRequiredInput(email, password, confirmPassword)) {
      alert('必須項目が未入力です。')
      return false
    }

    if (!isValidEmailFormat(email)) {
      alert('メールアドレスの形式が不正です。もう1度お試しください。')
      return false
    }
    if (password !== confirmPassword) {
      alert('パスワードが一致しません。もう1度お試しください。')
      return false
    }
    if (password.length < 6) {
      alert('パスワードは6文字以上で入力してください。')
      return false
    }

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/auth'
    const initialData = {
      name: name,
      occupation: occupation,
      organization: organization,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
    }

    await axios
      .post(apiUrl, initialData)
      .then((response) => {
        localStorage.setItem('access_token', response.headers['access-token'])
        localStorage.setItem('client', response.headers['client'])
        localStorage.setItem('uid', response.headers['uid'])
        dispatch(push('/posts/list')) // 途中のため、一時的に '/' としている
        notificationContent = {
          variant: 'success',
          message: 'アカウント登録に成功しました。',
        }
      })
      .catch((error) => {
        console.log('error', error)
        notificationContent = {
          variant: 'error',
          message: 'アカウント登録に失敗しました。もう一度お試しください。',
        }
      })

    await _sleep(1000)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}

export const signIn = (email, password) => {
  return async (dispatch) => {
    dispatch(showLoadingAction('サインインしています...'))

    if (!isValidRequiredInput(email, password)) {
      dispatch(hideLoadingAction())
      alert('メールアドレスかパスワードが未入力です。')
      return false
    }
    if (!isValidEmailFormat(email)) {
      dispatch(hideLoadingAction())
      alert('メールアドレスの形式が不正です。')
      return false
    }

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/auth/sign_in'
    const signInData = {
      email: email,
      password: password,
    }

    await axios
      .post(apiUrl, signInData)
      .then((response) => {
        localStorage.setItem('access_token', response.headers['access-token'])
        localStorage.setItem('client', response.headers['client'])
        localStorage.setItem('uid', response.headers['uid'])

        const userData = response.data.data
        const userProfile = {
          isSignedIn: true,
          uid: userData.id,
          name: userData.name,
          occupation: userData.occupation,
          organization: userData.organization,
          profile: userData.profile,
          image: userData.image,
          role: userData.admin,
        }
        dispatch(signInAction(userProfile))
        dispatch(push('/posts/list'))
        notificationContent = {
          variant: 'success',
          message: 'ログインしました。',
        }
        dispatch(initialFetchUsers())
        dispatch(initialFetchPosts())
        dispatch(initialFetchCategories())
        dispatch(initialFetchLikes())
      })
      .catch((error) => {
        console.log('error', error)
        notificationContent = {
          variant: 'error',
          message: 'ログインに失敗しました。',
        }
      })
    await _sleep(1000)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}

export const updateUserProfile = (
  uid,
  name,
  occupation,
  organization,
  profile,
  email,
  password,
  confirmPassword,
  data
) => {
  return async (dispatch) => {
    const apiUrl = process.env.REACT_APP_API_V1_URL + '/users/' + String(uid)
    const userProfile = {
      id: uid,
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmPassword,
      occupation: occupation,
      organization: organization,
      profile: profile,
      image: data,
    }

    await axios
      .patch(apiUrl, userProfile)
      .then(() => {
        dispatch(editProfileStateAction(userProfile))
        dispatch(goBack())
        notificationContent = {
          variant: 'success',
          message: 'ユーザー情報を更新しました。',
        }
      })
      .catch((error) => {
        console.log('error', error)
        notificationContent = {
          variant: 'error',
          message: 'ユーザー情報の更新に失敗しました。',
        }
      })

    await _sleep(1000)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}

export const signInGuestUser = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction('ゲストユーザとしてサインインしています...'))

    if (localStorage.getItem('access_token')) {
      // Local Storageの初期化
      localStorage.clear()

      // Store Userの初期化
      dispatch(signOutAction())
      await _sleep(1000)
    }

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/auth'
    const email = createRandamString(20) + '@example.com'
    const password = createRandamString(30)

    const guestData = {
      name: 'ゲストユーザー',
      email: email,
      password: password,
    }

    await axios
      .post(apiUrl, guestData)
      .then((response) => {
        localStorage.setItem('access_token', response.headers['access-token'])
        localStorage.setItem('client', response.headers['client'])
        localStorage.setItem('uid', response.headers['uid'])
        dispatch(push('/posts/list'))
        notificationContent = {
          variant: 'success',
          message: 'ゲストログインしました。',
        }
      })
      .catch((error) => {
        console.log('error', error)
        notificationContent = {
          variant: 'error',
          message: 'ログインに失敗しました。',
        }
      })

    await _sleep(1000)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}

export const signOut = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction('Sign out...'))
    dispatch(push('/'))
    // Local Storageの初期化
    localStorage.clear()

    // Store Userの初期化
    dispatch(signOutAction())
    await _sleep(1000)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction('success', 'ログアウトしました。'))
  }
}

export const deleteUser = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction('ユーザー情報を削除しています。'))

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/users'
    const data = {
      'access-token': localStorage.getItem('accessh_token'),
      client: localStorage.getItem('client'),
      uid: localStorage.getItem('uid'),
    }

    await axios
      .delete(apiUrl, { data })
      .then(() => {
        dispatch(push('/posts/list'))
        localStorage.clear()
        dispatch(signOutAction())
        notificationContent = {
          variant: 'success',
          message: '正常に退会が完了しました。',
        }
      })
      .catch((error) => {
        console.log('error', error)
        notificationContent = {
          variant: 'error',
          message: '退会に失敗しました。',
        }
      })

    await _sleep(1000)
    dispatch(hideLoadingAction())
    await _sleep(300)
    dispatch(setNotificationAction(...Object.values(notificationContent)))
  }
}
