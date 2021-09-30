export const EDIT_USER_PROFILE = 'EDIT_USER_PROFILE'
export const editProfileStateAction = (userProfile) => {
  return {
    type: 'EDIT_USER_PROFILE',
    payload: userProfile,
  }
}

export const SIGN_IN = 'SIGN_IN'
export const signInAction = (userProfile) => {
  return {
    type: 'SIGN_IN',
    payload: userProfile,
  }
}

export const SIGN_OUT = 'SIGN_OUT'
export const signOutAction = () => {
  return {
    type: 'SIGN_OUT',
    payload: {
      isSignedIn: false,
      role: '',
      uid: '',
      username: '',
      occupation: '',
      organization: '',
      profile: '',
      image: '',
    },
  }
}
