///////////////////////////////////////////////////////////
////////////        REDUCER - COMMENTS         ////////////
///////////////////////////////////////////////////////////

// Import dependencies
import {
  GET_COMMENTS,
  EDIT_COMMENT,
  DELETE_COMMENT,
} from "../actions/comments.actions";

const initialState = {};

export default function commentsReducer(state = initialState, action) {
  switch (action.type) {
    case GET_COMMENTS:
      return action.payload;
    case EDIT_COMMENT:
      return state.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            content: action.payload.content,
          };
        } else {
          return comment;
        }
      });
    case DELETE_COMMENT:
      return state.filter((comment) => comment.id !== action.payload.commentId);
    default:
      return state;
  }
}
