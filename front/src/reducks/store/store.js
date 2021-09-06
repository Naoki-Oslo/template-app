import { createStore as reduxCreateStore, combineReducers, applyMiddleware, compose } from 'redux';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import { LoadingReducer } from '../loading/reducers'; 
import { NotificationReducer } from '../notification/reducers';
import { PostsReducer } from '../posts/reducers';
import { UsersReducer } from '../users/reducers';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function createStore(history) {
    return reduxCreateStore(
        combineReducers({
            loading: LoadingReducer,
            notification: NotificationReducer,
            router: connectRouter(history),
            posts: PostsReducer,
            users: UsersReducer,
        }),
        composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
    );
};