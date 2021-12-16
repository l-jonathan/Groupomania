////////////////////////////////////////////////////////////
////////////            USER ACTIONS            ////////////
////////////////////////////////////////////////////////////

// Import axios
import axios from "axios";

// Declaration of store actions
export const GET_USER = "GET_USER";
export const UPDATE_DESCR = "UPDATE_DESCR";
export const UPDATE_PHOTO = "UPDATE_PHOTO";
export const DELETE_PROFIL = "DELETE_PROFIL";

// Function to get one user
export const getUser = (id) => {
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/auth/${id}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

// Function to update the description of a user
export const updateDescription = (id, userDescription) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/auth/` + id,
      data: { userDescription },
    })
      .then((res) => {
        dispatch({ type: UPDATE_DESCR, payload: userDescription });
      })
      .catch((err) => console.log(err));
  };
};

// Function to update the photo of a user
export const updatePhoto = (id, profilePhoto) => {
  return (dispatch) => {
    return axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URL}api/auth/` + id,
      data: { profilePhoto },
    })
      .then((res) => {
        dispatch({ type: UPDATE_PHOTO, payload: profilePhoto });
      })
      .catch((err) => console.log(err));
  };
};

// Function to delete a user
export const deleteProfil = (id) => {
  return (dispatch) => {
    return axios({
      method: "delete",
      url: `${process.env.REACT_APP_API_URL}api/auth/` + id,
    })
      .then((res) => {
        dispatch({ type: DELETE_PROFIL, payload: id });
      })
      .catch((err) => console.log(err));
  };
};
