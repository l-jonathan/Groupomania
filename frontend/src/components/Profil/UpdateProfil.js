import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import UploadImg from "./UploadImg";
import { updateDescription } from "../../actions/user.actions";
import { dateParser } from "../Utils";

const UpdateProfil = () => {
  const [userDescription, setDescription] = useState("");
  const [updateForm, setUpdateForm] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  //const usersData = useSelector((state) => state.usersReducer);
  //const error = useSelector((state) => state.errorReducer.userError);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    dispatch(updateDescription(userData.id, userDescription));
    setUpdateForm(false);
  };

  return (
    <div className="profil-container">
      <h1> Profil de {userData.firstName}</h1>
      <div className="update-container">
        <div className="left-part">
          <h3>Photo de profil</h3>
          {/*<img src={userData.picture} alt="user-pic" />
          <UploadImg />
          <p>{error.maxSize}</p>
  <p>{error.format}</p>*/}
        </div>
        <div className="right-part">
          <div className="bio-update">
            <h3>Description</h3>
            {updateForm === false && (
              <>
                <p onClick={() => setUpdateForm(!updateForm)}>{userData.userDescription}</p>
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
        </div>
      </div>
    </div>
  );
};

export default UpdateProfil;
