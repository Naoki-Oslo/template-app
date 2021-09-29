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

    currentUser: {
        isSignedIn: false,
        role: "",
        uid: "",
        name: "",
        occupation: "",
        organization: "",
        profile: "",
        image: "",
    },

    posts: {
        list: []
    },

    memos: {
        list: []
    },

    categories: {
        list: []
    },

    likes: {
        list: []
    },

    favorites: {
        list: []
    },

    users: {
        list: []
    }
};