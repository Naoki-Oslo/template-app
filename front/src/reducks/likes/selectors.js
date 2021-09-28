import { createSelector } from "reselect";

const likesSelector = (state) => state.likes;

export const getLikes = createSelector(
    [likesSelector],
    state => state.list
);
