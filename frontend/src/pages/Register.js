///////////////////////////////////////////////////////////
////////////           REGISTER FORM           ////////////
///////////////////////////////////////////////////////////

// Import dependencies
import React from "react";
import Log from "../components/Log";

// Display register form
const Register = () => {
  return (
    <div className="profil-page">
      <div className="log-container">
        <Log />
        <div className="img-container">
          <img src="./img/icon.png" alt="img-log" />
        </div>
      </div>
    </div>
  );
};

export default Register;
