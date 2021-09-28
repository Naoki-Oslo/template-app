import { createStore as reduxCreateStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { LoadingReducer } from 'reducks/loading/reducers'; 
import { NotificationReducer } from 'reducks/notification/reducers';
import { PostsReducer } from 'reducks/posts/reducers';
import { UsersReducer } from 'reducks/users/reducers';
import { CurrentUserReducer } from 'reducks/currentUser/reducers';
import { CategoriesReducer } from 'reducks/categories/reducers';
import { LikesReducer } from 'reducks/likes/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            loading: LoadingReducer,
            notification: NotificationReducer,
            router: connectRouter(history),
            posts: PostsReducer,
            currentUser: CurrentUserReducer,
            categories: CategoriesReducer,
            users: UsersReducer,
            likes: LikesReducer,
        }),
        composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
    );
};