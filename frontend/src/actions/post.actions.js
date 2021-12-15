import axios from "axios";

// posts
export const GET_POSTS = "GET_POSTS";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const ADD_POST = "ADD_POST";

export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/`)
      //.orderBy([updatedAt], 'desc')
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const addPost = (content, userId) => {
  return (dispatch) => {
    return axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/post/`,
      data: { content, userId },
    })
      .then((res) => {
        dispatch({ type: ADD_POST, payload: { userId } });
      })
      .catch((err) => console.log(err));
  };
};

export const updatePost = (id, content) => {
  return (dispatch) => {
    console.log("post.id"+id)
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
      data: { content },
    })
      .then((res) => {
        dispatch({ type: UPDATE_POST, payload: { content, id } });
      })
      .catch((err) => console.log(err));
  };
};

export const deletePost = (id) => {
  return (dispatch) => {
    console.log("post.id"+id)
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/post/${id}`,
    })
      .then((res) => {
        dispatch({ type: DELETE_POST, payload: { id } });
      })
      .catch((err) => console.log(err));
  };
};