export const initialState = {  
    loading: {
        state: false,
        text: '',
    },
    
    notification: {
        isOpen: false,
        variant: 'success',
        message: '',
    },

    posts: {
        list: []
    },

    users: {
        isSignedIn: false,
        role: "",
        uid: "",
        username: ""
    }
};