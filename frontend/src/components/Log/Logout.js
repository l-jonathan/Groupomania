////////////////////////////////////////////////////////////
////////////           PAGE FOR LOGOUT          ////////////
////////////////////////////////////////////////////////////

// Import dependencies
import React from "react";
import axios from "axios";

// Function to logout
const Logout = () => {
  const logout = async () => {
    await axios({
      method: "get",
      url: `${process.env.REACT_APP_API_URL}api/auth/logout`,
      withCredentials: true,
    }).catch((err) => console.log(err));
    window.location = "/";
  };

  return (
    <li onClick={logout}>
      <img src="./img/icons/logout.svg" alt="logout" />
    </li>
  );
};

export default Logout;
