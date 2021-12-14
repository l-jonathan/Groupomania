import axios from "axios";

export const GET_COMMENTS = "GET_COMMENTS";
export const ADD_COMMENT = "ADD_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const DELETE_COMMENT = "DELETE_COMMENT";

export const getComments = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/get-comment`)
      .then((res) => {
        dispatch({ type: GET_COMMENTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addComment = (postId,content, userId) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post/${postId}/create-comment`,
      data: { userId, content },
    })
      .then((res) => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
}

export const editComment = ( commentId, content) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/update-comment/${commentId}`,
      data: { commentId, content },
    })
      .then((res) => {
        dispatch({ type: EDIT_COMMENT, payload: { commentId, content } });
      })
      .catch((err) => console.log(err));
  };
}

export const deleteComment = ( commentId ) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/delete-comment/${commentId}`,
      data: { commentId },
    })
      .then((res) => {
        dispatch({ type: DELETE_COMMENT, payload: { commentId } });
      })
      .catch((err) => console.log(err));
  };
}
