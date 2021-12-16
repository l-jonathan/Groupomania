///////////////////////////////////////////////////////////
////////////              PROFIL               ////////////
///////////////////////////////////////////////////////////

// Import dependencies
import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";

const Profil = () => {
  const uid = useContext(UidContext);

  // Display the profil page
  return (
    <div className="profil-page">
      {uid ? (
        <UpdateProfil />
      ) : (
        <div className="log-container">
          <Log signin={false} signup={true} />
          <div className="img-container">
            <img src="./img/icon.svg" alt="logo groupomania" />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
