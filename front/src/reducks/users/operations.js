import axios from 'axios';
import { push } from 'connected-react-router';
import { _sleep, createRandamString, isValidEmailFormat, isValidRequiredInput } from 'function/common';
import { hideLoadingAction, showLoadingAction } from '../loading/actions';
import { setNotificationAction } from '../notification/actions';
import { signInAction, signOutAction } from './actions';

require('dotenv').config();
axios.defaults.headers.post['Access-Control-Allow-Origin'] = 'http://localhost:8000';

let notificationContent = {}

export const listenAuthState = () => {
  return async (dispatch) => {
    // LocalStorageに認証情報が含まれている場合
    if (localStorage.getItem('auth_token')) {
      const auth_token = localStorage.getItem('auth_token')
      const client_id = localStorage.getItem('client_id')
      const uid = localStorage.getItem('uid')
      const apiEndpoint = process.env.REACT_APP_API_V1_URL + '/users/currentuser'

      axios
        .get(apiEndpoint, {
          headers: {
            'access-token': auth_token,
            client: client_id,
            uid: uid,
          },
        })
        .then((response) => {
          const userData = response.data.data

          dispatch(
            signInAction({
              isSignedIn: true,
              uid: userData.id,
              username: userData.name,
            })
          )
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
};


export const signUp = (username, email, password, confirmPassword) => {
    return async (dispatch) => {

        // Validations
        if(!isValidRequiredInput(email, password, confirmPassword)) {
            alert('必須項目が未入力です。');
            return false
        }

        if(!isValidEmailFormat(email)) {
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

        const apiUrl = process.env.REACT_APP_API_V1_URL + '/auth';
        const initialData = {
            name: username,
            email: email,
            password: password,
            password_confirmation: confirmPassword,
        };


        await axios
            .post(apiUrl, initialData)
            .then((response) => {
                localStorage.setItem('access-token', response.headers['access-token']);
                localStorage.setItem('client', response.headers['client']);
                localStorage.setItem('uid', response.headers['uid']);
                dispatch(push('/')) // 途中のため、一時的に '/' としている
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
};


export const signIn = (email, password) => {
    return async (dispatch) => {

        dispatch(showLoadingAction("Sign in..."));
        
        if (!isValidRequiredInput(email, password)) {
            dispatch(hideLoadingAction());
            alert('メールアドレスかパスワードが未入力です。')
            return false
        }
        if (!isValidEmailFormat(email)) {
            dispatch(hideLoadingAction());
            alert('メールアドレスの形式が不正です。')
            return false
        }

        const apiUrl = process.env.REACT_APP_API_V1_URL + '/auth';
        const signInData = {
            email: email,
            password: password,
        };

        await axios
            .post(apiUrl, signInData)
            .then((response) => {
                localStorage.getItem('access-token', response.headers['access-token']);
                localStorage.getItem('client', response.headers['client']);
                localStorage.getItem('uid', response.headers['uid']);
                dispatch(push('/')) // 途中のため、一時的に '/' としている
                notificationContent = {
                  variant: 'success',
                  message: 'ログインしました。',
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
};


export const signInGuestUser = () => {
  return async (dispatch) => {
    dispatch(showLoadingAction('Sign-in as guest user...'))

    if (localStorage.getItem('auth_token')) {
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
        localStorage.setItem('auth_token', response.headers['access-token'])
        localStorage.setItem('client_id', response.headers['client'])
        localStorage.setItem('uid', response.headers['uid'])
        dispatch(push('/')) // 途中のため、一時的に '/' としている
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
};


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

    const apiUrl = process.env.REACT_APP_API_V1_URL + '/user/delete'
    const data = {
      'access-token': localStorage.getItem('auth_token'),
      client: localStorage.getItem('client_id'),
      uid: localStorage.getItem('uid'),
    }

    await axios
      .delete(apiUrl, { data })
      .then(() => {
        dispatch(push('/'))
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
};
