export const FETCH_LIKES = "FETCH_LIKES";
export const fetchLikesAction = (likes) => {
    return {
        type: "FETCH_LIKES",
        payload: likes
    }
}

export const CREATE_LIKES = "CREATE_LIKES";
export const createLikesAction = (likes) => {
    return {
        type: "CREATE_LIKES",
        payload: likes
    }
}

export const DELETE_LIKES = "DELETE_LIKES";
export const deleteLikesAction = (likes) => {
    return {
        type: "DELETE_LIKES",
        payload: likes
    }
}