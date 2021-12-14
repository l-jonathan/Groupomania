import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import usersReducer from './users.reducer';
import postReducer from './post.reducer';
import commentsReducer from './comments.reducer';
import likeReducer from './like.reducer';

export default combineReducers({
    userReducer,
    usersReducer,
    postReducer,
    commentsReducer,
    likeReducer,
});