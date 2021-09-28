export const FETCH_POSTS = "FETCH_POSTS";
export const fetchPostsAction = (posts) => {
    return {
        type: "FETCH_POSTS",
        payload: posts
    }
}

export const CREATE_POST = "CREATE_POST";
export const createPostsAction = (posts) => {
    return {
        type: "CREATE_POST",
        payload: posts
    }
}

export const UPDATE_POST = "UPDATE_POST";
export const updatePostsAction = (posts) => {
    return {
        type: "UPDATE_POST",
        payload: posts
    }
}


export const DELETE_POST = "DELETE_POST";
export const deletePostAction = (posts) => {
    return {
        type: "DELETE_POST",
        payload: posts
    }
}
