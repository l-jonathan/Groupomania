///////////////////////////////////////////////////////////
////////////           USERS ACTIONS           ////////////
///////////////////////////////////////////////////////////

// Import axios
import axios from "axios";

// Declaration of store actions
export const GET_USERS = "GET_USERS";

// Function to get all users
export const getUsers = () => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/auth/allUsers`)
      .then((res) => {
        dispatch({ type: GET_USERS, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};
