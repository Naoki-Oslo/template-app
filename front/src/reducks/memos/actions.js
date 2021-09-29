export const FETCH_MEMOS = "FETCH_MEMOS";
export const fetchMemosAction = (memos) => {
    return {
        type: "FETCH_MEMOS",
        payload: memos
    }
}

export const CREATE_MEMO = "CREATE_MEMO";
export const createMemosAction = (memos) => {
    return {
        type: "CREATE_MEMO",
        payload: memos
    }
}

export const UPDATE_MEMO = "UPDATE_MEMO";
export const updateMemosAction = (memos) => {
    return {
        type: "UPDATE_MEMO",
        payload: memos
    }
}


export const DELETE_MEMO = "DELETE_MEMO";
export const deleteMemosAction = (memos) => {
    return {
        type: "DELETE_MEMO",
        payload: memos
    }
}
