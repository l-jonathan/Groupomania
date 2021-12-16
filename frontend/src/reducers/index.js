////////////////////////////////////////////////////////////
////////////          REDUCER - INDEX           ////////////
////////////////////////////////////////////////////////////

// Import dependencies & all reducers
import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";
import commentsReducer from "./comments.reducer";
import likeReducer from "./like.reducer";

// Combine all reducers
export default combineReducers({
  userReducer,
  usersReducer,
  postReducer,
  commentsReducer,
  likeReducer,
});
