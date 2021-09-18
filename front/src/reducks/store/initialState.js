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

    categories: {
        list: []
    },

    currentUser: {
        isSignedIn: false,
        role: "",
        uid: "",
        username: "",
        occupation: "",
        organization: "",
        profile: "",
        image: "",
    },

    users: {
        list: []
    }
};