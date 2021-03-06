///////////////////////////////////////////////////////////
////////////       PAGE PROFIL - UPDATE        ////////////
///////////////////////////////////////////////////////////

// Import dependencies
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDescription } from "../../actions/user.actions";
import { dateParser } from "../Utils";
import DeleteProfil from "./DeleteProfil";

// Function to update the profil
const UpdateProfil = () => {
  const [userDescription, setDescription] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateDescription(userData.id, userDescription));
    setUpdateForm(false);
  };

  // Display the profil and the form to update the description
  return (
    <div className="profil-container">
      <h1> Profil de {userData.firstName}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          {<img src={userData.profilePhoto} alt="user-pic" />}
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Description</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>
                  {userData.userDescription}
                </p>
                <button onClick={() => setUpdateForm(!updateForm)}>
                  Modifier description
                </button>
              </>
            )}
            {updateForm && (
              <>
                <textarea
                  type="text"
                  defaultValue={userData.userDescription}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
                <button onClick={handleUpdate}>Valider modifications</button>
              </>
            )}
          </div>
          <h4>Membre depuis le : {dateParser(userData.createdAt)}</h4>
          <DeleteProfil id={userData.id} />
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
