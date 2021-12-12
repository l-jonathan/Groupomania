import axios from "axios";

export const GET_USER = "GET_USER";
export const UPDATE_DESCR = "UPDATE_DESCR";

export const getUser = (id) => {
  console.log("user.actions.js getUser: " + id);
  return (dispatch) => {
    return axios
      .get(`${process.env.REACT_APP_API_URL}api/auth/${id}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
};

export const updateDescription = (id, userDescription) => {
  console.log("updateDescription: " + id + userDescription);
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
