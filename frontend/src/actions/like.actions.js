///////////////////////////////////////////////////////////
////////////           LIKES ACTIONS           ////////////
///////////////////////////////////////////////////////////

// Import axios
import axios from "axios";

// Declaration of store actions
export const GET_LIKE = "GET_LIKE";
export const READ_LIKE = "READ_LIKE";

// Function to get all likes
export const getLike = (postId, userId) => {
  console.log("getLike postId: " + postId);
  return (dispatch) => {
    return axios({
      method: "POST",
      url: `${process.env.REACT_APP_API_URL}api/post/` + postId + `/like`,
      data: { postId, userId },
    })
      .then((res) => {
        dispatch({ type: GET_LIKE, payload: postId, userId });
      })
      .catch((err) => console.log(err));
  };
};

// Function to add and delete a like
export const readLike = () => {
  console.log("readLike");
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/post/like`)
      .then((res) => {
        dispatch({ type: READ_LIKE, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
