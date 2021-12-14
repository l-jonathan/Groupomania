import { READ_LIKE } from "../actions/like.actions";

const initialState = {};

export default function likeReducer(state = initialState, action) {
  switch (action.type) {
    case READ_LIKE:
      return action.payload;
    default:
      return state;
  }
}
