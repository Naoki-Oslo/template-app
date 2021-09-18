import { createSelector } from 'reselect';

const currentUserSelector = (state) => state.currentUser;

export const getCurrentUser = createSelector(
    [currentUserSelector],
    state => state
);

export const getSignedIn = createSelector(
    [currentUserSelector],
    state => state.isSignedIn
);

export const getUserId = createSelector(
    [currentUserSelector],
    state => state.uid
);

export const getUsername = createSelector(
    [currentUserSelector],
    state => state.username
);

export const getUserRole = createSelector(
    [currentUserSelector],
    state => state.role
);

export const getUserOccupation = createSelector(
    [currentUserSelector],
    state => state.occupation
);

export const getUserOrganization = createSelector(
    [currentUserSelector],
    state => state.organization
);

export const getUserProfile = createSelector(
    [currentUserSelector],
    state => state.profile
);

export const getUserImage = createSelector(
    [currentUserSelector],
    state => state.image
);
